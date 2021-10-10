import { ensure } from "@project/essentials";
import { RPCApiHandler, RPCHandler } from "../durableObjects/rpc";
import { StoredEvent } from "../events/events";
import { Env } from "../env";
import { System } from "../system/system";
import { InspectableStorageDurableObject } from "../admin/InspectableStorageDurableObject";
import { iterateEventStore } from "../events/iterateEventStore";
import { ReadModelAdminState, ReadModelAdminStatus } from "./readModels";

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
    protected handleEvent: (event: StoredEvent) => Promise<unknown>
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
    await this.storage.put("adminState", { ...this.adminState, status });
  }

  /**
   * We handle an incoming event in a buffer so that we can gracefully handle
   * new events while we are waiting for a previous event handler to return.
   */
  onEvent: RPCHandler<API, "onEvent"> = async ({ event }) => {
    // First we push the event to the end of the buffer as its may be in a queue
    this.eventBuffer.push(event);

    // If we are rebuilding then we cant handle the event right now so lets just return
    if (this.adminState.status != "built") {
      this.logger.debug(
        `cannot handle '${event.kind}' while in the '${this.adminState.status}' state..`
      );
      return;
    }

    // Now we can iterate through the stack and handle each event
    while (this.eventBuffer.length > 0) {
      const event = ensure(this.eventBuffer.shift());
      await this.handleEvent(event);
    }

    return {};
  };

  rebuild: RPCHandler<API, "rebuild"> = async ({}) => {
    if (this.adminState.status != "built")
      throw new Error(`Cannot rebuild while in the '${this.adminState.status}' state`);

    // First we update the status so other events cant come in
    await this.setBuildStatus("building");

    // First empty all the storage
    await this.storage.deleteAll();

    // Then iterate over all the events in the store
    await iterateEventStore({
      store: this.system.getEventStore(this.env),
      cb: (event) => this.handleEvent(event),
    });

    // Finally reset the status so events can come back in
    await this.setBuildStatus("built");

    return {};
  };
}
