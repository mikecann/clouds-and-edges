import { RPCDurableObject } from "../durableObjects/RPCDurableObject";
import { findInObj, getInObj, getLogger, Logger } from "@project/essentials";
import { RPCApiHandler, RPCHandler } from "../durableObjects/rpc";
import { ProjectionAdminState } from "./projections";
import { createDurableObjectRPCProxy } from "../durableObjects/createDurableObjectRPCProxy";
import { BaseEventStore } from "../events/BaseEventStore";
import { StoredEvent } from "../events/events";

export type ProjectionDurableObjectAPI = {
  onEvent: {
    input: {
      event: StoredEvent;
    };
    output: {};
  };
  getAdminState: {
    input: {};
    output: ProjectionAdminState;
  };
  getStorageContents: {
    input: {};
    output: {
      contents: Record<string, unknown>;
    };
  };
  rebuild: {
    input: {};
    output: {};
  };
};

type API = ProjectionDurableObjectAPI;

export class ProjectionDurableObject<TEnv = object>
  extends RPCDurableObject<TEnv>
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
    protected getEventStoreStub: () => DurableObjectStub,
    protected aggregate: string
  ) {
    super();
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

  getAdminState: RPCHandler<API, "getAdminState"> = async ({}) => {
    return this.adminState;
  };

  getStorageContents: RPCHandler<API, "getStorageContents"> = async ({}) => {
    return {
      contents: await this.storage.list().then(Object.fromEntries),
    };
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
      const { events } = await createDurableObjectRPCProxy(
        BaseEventStore,
        this.getEventStoreStub()
      ).getEvents({
        aggregate: this.aggregate,
      });
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
