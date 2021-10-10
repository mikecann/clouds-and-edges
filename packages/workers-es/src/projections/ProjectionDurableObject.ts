import { RPCApiHandler } from "../durableObjects/rpc";
import { ProjectionEventHandlers } from "./projections";
import { EventInput } from "../events/events";
import { System } from "../system/system";
import { Env } from "../env";
import {
  ReadModalDurableObject,
  ReadModalDurableObjectAPI,
} from "../readModel/ReadModelDurableObject";

export type ProjectionDurableObjectAPI = ReadModalDurableObjectAPI;

export class ProjectionDurableObject<TEnv = object>
  extends ReadModalDurableObject<TEnv>
  implements RPCApiHandler<ProjectionDurableObjectAPI>
{
  constructor(
    objectState: DurableObjectState,
    handlers: ProjectionEventHandlers<EventInput>,
    env: Env,
    system: System
  ) {
    super(objectState, env, system, async (event) => {
      const handler = handlers[event.kind];
      if (!handler) return;
      this.logger.debug(`handling event '${event.kind}'`);
      handler({ event });
    });
  }
}
