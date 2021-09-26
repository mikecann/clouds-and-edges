import { AggregateCommandHandler, AggregateCommandHandlers } from "../commands/commands";
import { AggregateReducer, AggregateReducers } from "../reducers";
import { getInObj, getLogger, Logger } from "@project/essentials";
import { RPCApiHandler, RPCHandler } from "../durableObjects/rpc";
import { Env } from "../env";
import { System } from "../system/system";
import { InspectableStorageDurableObject } from "../admin/InspectableStorageDurableObject";

export type AggreateDurableObjectAPI = {
  execute: {
    input: {
      userId: string;
      command: string;
      payload: unknown;
    };
    output: {};
  };
};

type API = AggreateDurableObjectAPI;

export class AggreateDurableObject<TState extends unknown = unknown, TEnv extends Env = Env>
  extends InspectableStorageDurableObject<TEnv>
  implements RPCApiHandler<API>
{
  protected state: TState = {} as any;
  protected logger: Logger;
  protected storage: DurableObjectStorage;

  constructor(
    protected objectState: DurableObjectState,
    protected env: TEnv,
    protected system: System,
    protected aggregate: string,
    protected commands: AggregateCommandHandlers<any, any, any>,
    protected reducers: AggregateReducers<any>
  ) {
    super(objectState);
    this.storage = objectState.storage;
    this.logger = getLogger(`${aggregate}-aggregate`);
  }

  protected get aggregateId() {
    return this.objectState.id.toString();
  }

  protected async init() {
    let stored = (await this.storage.get("state")) as TState | undefined;
    this.state = stored || ({} as any);
  }

  execute: RPCHandler<API, "execute"> = async (input) => {
    const timestamp = Date.now();

    this.logger.debug(`execution starting`, {
      input,
      aggregateId: this.aggregateId,
      timestamp,
    });

    // First we grabe the handler for the command
    const commandHandler: AggregateCommandHandler<TState, any, any> = getInObj(
      this.commands,
      input.command
    );

    // Then we execute the command which returns an event (or throws an error)
    const addEventInput = commandHandler({
      state: this.state,
      userId: input.userId,
      timestamp,
      payload: input.payload,
    });

    const addEventToStore = async () => {
      // We then add that event to the store
      await this.system.getEventStore(this.env).addEvent({
        aggregate: this.aggregate,
        aggregateId: this.aggregateId,
        kind: addEventInput.kind,
        payload: addEventInput.payload,
        timestamp,
      });
    };

    const updateLocalState = async () => {
      const reducer: AggregateReducer<TState, any> = getInObj(this.reducers, addEventInput.kind);

      const reducedState = reducer({
        state: this.state,
        timestamp,
        aggregateId: this.aggregateId,
        payload: addEventInput.payload,
      });

      this.state = reducedState;
      await this.storage.put("state", reducedState);

      this.logger.debug(`reducedState stored`, reducedState);
    };

    // At the same time we add the event to the store and update the local state
    await updateLocalState();
    await addEventToStore();

    this.logger.debug(`execution finished`);

    return {};
  };
}
