import { RPCApiHandler } from "../durableObjects/rpc";
import { ProcessEventHandlers } from "./processes";
import { Env } from "../env";
import { System } from "../system/system";
import { handleProcessEvent } from "./handleProcessEvent";
import {
  ReadModalDurableObject,
  ReadModalDurableObjectAPI,
} from "../readModel/ReadModelDurableObject";

export type ProcessDurableObjectAPI = ReadModalDurableObjectAPI;

export class ProcessDurableObject<TEnv = Env>
  extends ReadModalDurableObject<TEnv>
  implements RPCApiHandler<ProcessDurableObjectAPI>
{
  constructor(
    objectState: DurableObjectState,
    handlers: ProcessEventHandlers,
    env: Env,
    system: System
  ) {
    super(objectState, env, system, (event) =>
      handleProcessEvent({
        event,
        handlers,
        env,
        system,
        logger: this.logger,
        // We can only execute side effects once we are built
        canExecuteSideEffects: this.adminState.status == "built",
      })
    );
  }
}
