import { ensure } from "@project/essentials";
import { RPCApiHandler, RPCHandler } from "../durableObjects/rpc";
import { StoredEvent } from "../events/events";
import { Env } from "../env";
import { System } from "../system/system";
import { InspectableStorageDurableObject } from "../admin/InspectableStorageDurableObject";
import { ReadModelAdminState, ReadModelAdminStatus } from "./readModels";
import { build } from "./build";

export type ReadModalDurableObjectAPI = {
  onEvent: {
    input: {
      event: StoredEvent;
    };
    output: {};
  };
  rebuild: {
    input: {};
    output: {};
  };
};

type API = ReadModalDurableObjectAPI;

export class ReadModalDurableObject<TEnv = Env>
  extends InspectableStorageDurableObject<TEnv>
  implements RPCApiHandler<API>
{
  protected storage: DurableObjectStorage;

  protected adminState: ReadModelAdminState = {
    status: "not-built",
  };

  protected eventBuffer: StoredEvent[] = [];

  constructor(
    protected objectState: DurableObjectState,
    protected env: Env,
    protected system: System,
    protected eventHandler: (event: StoredEvent) => Promise<unknown>
  ) {
    super(objectState);
    this.storage = objectState.storage;
  }

  protected async init() {
    const stored: ReadModelAdminState = await this.storage.get("adminState");
    this.adminState = stored ?? this.adminState;
  }

  private async setBuildStatus(status: ReadModelAdminStatus) {
    this.logger.debug(`Build status changed: '${status}'`);
    this.adminState = { ...this.adminState, status };
    await this.storage.put("adminState", this.adminState);
  }

  /**
   * We handle an incoming event in a buffer so that we can gracefully handle
   * new events while we are waiting for a previous event handler to return.
   */
  onEvent: RPCHandler<API, "onEvent"> = async ({ event }) => {
    // First we push the event to the end of the buffer as its may be in a queue
    this.eventBuffer.push(event);

    // If we are rebuilding then we cant handle the event right now so lets just return
    if (this.adminState.status == "building") return {};

    // If we havent been built yet then lets do so now
    if (this.adminState.status == "not-built")
      await build({
        setBuildStatus: this.setBuildStatus.bind(this),
        storage: this.storage,
        store: this.system.getEventStore(this.env),
        eventHandler: this.eventHandler.bind(this),
        // We add this so that the build process finishes when we reach this event as
        // we dont want to process this event twice
        untilEvent: event.id,
      });

    // Now we can iterate through the stack and handle each event
    while (this.eventBuffer.length > 0) {
      const event = ensure(this.eventBuffer.shift());
      await this.eventHandler(event);
    }

    return {};
  };

  rebuild: RPCHandler<API, "rebuild"> = async ({}) => {
    if (this.adminState.status != "built")
      throw new Error(
        `${this.constructor.name} cannot rebuild while in the '${this.adminState.status}' state`
      );

    await build({
      setBuildStatus: this.setBuildStatus.bind(this),
      storage: this.storage,
      store: this.system.getEventStore(this.env),
      eventHandler: this.eventHandler.bind(this),
    });

    return {};
  };
}
