import { findInObj, getLogger, Logger } from "@project/essentials";
import { RPCApiHandler, RPCHandler } from "../durableObjects/rpc";
import { ProjectionAdminState } from "./projections";
import { StoredEvent } from "../events/events";
import { System } from "../system/system";
import { Env } from "../env";
import { InspectableStorageDurableObject } from "../admin/InspectableStorageDurableObject";

export type ProjectionDurableObjectAPI = {
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

type API = ProjectionDurableObjectAPI;

export class ProjectionDurableObject<TEnv = object>
  extends InspectableStorageDurableObject<TEnv>
  implements RPCApiHandler<API>
{
  protected logger: Logger;
  protected storage: DurableObjectStorage;

  protected adminState: ProjectionAdminState = {
    status: "not-built",
  };

  constructor(
    protected objectState: DurableObjectState,
    protected handlers: any,
    protected env: Env,
    protected system: System,
    protected aggregate: string
  ) {
    super(objectState);
    this.storage = objectState.storage;
    this.logger = getLogger(`${this.constructor.name}`);
  }

  protected async init() {
    const stored: ProjectionAdminState = await this.storage.get("adminState");
    this.adminState = stored ?? this.adminState;
  }

  onEvent: RPCHandler<API, "onEvent"> = async ({ event }) => {
    this.logger.debug(`handling event`, event);

    const handler = findInObj(this.handlers, event.kind);
    if (!handler) {
      this.logger.debug(`projection unable to handle event '${event.kind}'`);
      return {};
    }
    await handler({ event });

    return {};
  };

  rebuild: RPCHandler<API, "rebuild"> = async ({}) => {
    this.logger.debug(`rebuilding..`);
    await this.storage.deleteAll();

    this.adminState = {
      status: "building",
    };
    await this.storage.put("adminState", this.adminState);

    // This should be done as a cronjob response
    const doRebuild = async () => {
      // Without waiting for the response lets rebuild, hopefully this promise isnt killed..
      const { events } = await this.system
        .getEventStore(this.env)
        .getEvents({ aggregate: this.aggregate });

      for (let event of events) await this.onEvent({ event });
    };

    await doRebuild();

    this.adminState = {
      status: "built",
    };
    await this.storage.put("adminState", this.adminState);

    return {};
  };
}
