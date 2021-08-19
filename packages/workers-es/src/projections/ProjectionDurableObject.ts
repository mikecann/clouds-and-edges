import { RPCDurableObject } from "../durableObjects/RPCDurableObject";
import { findInObj, getLogger, Logger } from "@project/essentials";
import { Event } from "../events/Event";
import { RPCApiHandler, RPCHandler } from "../durableObjects/rpc";
import { ProjectionAdminState } from "./projections";

export type ProjectionDurableObjectAPI = {
  onEvent: {
    input: {
      event: Event;
    };
    output: {};
  };
  getAdminState: {
    input: {};
    output: ProjectionAdminState;
  };
};

type API = ProjectionDurableObjectAPI;

export class ProjectionDurableObject<TEnv>
  extends RPCDurableObject<TEnv>
  implements RPCApiHandler<API>
{
  protected logger: Logger;
  protected storage: DurableObjectStorage;

  constructor(
    protected objectState: DurableObjectState,
    protected env: TEnv,
    protected handlers: any
  ) {
    super();
    this.storage = objectState.storage;
    this.logger = getLogger(`${this.constructor.name}`);
  }

  protected async init() {}

  onEvent: RPCHandler<API, "onEvent"> = async ({ event }) => {
    this.logger.debug(`handling event`, event);

    const handler = findInObj(this.handlers, event.kind);
    if (!handler) {
      this.logger.debug(`projection unable to handle event '${event.kind}'`);
      return;
    }
    await handler({ event });
  };

  getAdminState: RPCHandler<API, "getAdminState"> = async ({}) => {
    return {
      status: "not-built",
    };
  };
}
