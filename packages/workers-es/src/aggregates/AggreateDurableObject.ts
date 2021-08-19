import { AggregateCommandHandlers } from "../commands/commands";
import { AggregateReducers } from "../reducers";
import { addEventToEventStore } from "../events/addEventToEventStore";
import { AddEventInput } from "../events/events";
import { RPCDurableObject } from "../durableObjects/RPCDurableObject";
import { ensure, getInObj, getLogger, Logger } from "@project/essentials";
import { RPCApiHandler, RPCHandler } from "../durableObjects/rpc";

export type AggreateDurableObjectAPI = {
  execute: {
    input: {
      command: string;
      payload: string;
    };
    output: {
      aggregateId: string;
    };
  };
};

type API = AggreateDurableObjectAPI;

export class AggreateDurableObject<TState extends Record<string, any>, TEnv>
  extends RPCDurableObject<TEnv>
  implements RPCApiHandler<API>
{
  protected state: TState = {} as any;
  protected logger: Logger;
  protected aggregateId: string;
  protected storage: DurableObjectStorage;

  constructor(
    protected objectState: DurableObjectState,
    protected env: TEnv,
    protected aggregate: string,
    protected commands: AggregateCommandHandlers<TState>,
    protected reducers: AggregateReducers<TState>
  ) {
    super();
    this.storage = objectState.storage;
    this.logger = getLogger(`${aggregate}-aggregate`);
    this.aggregateId = ensure(objectState.id.name);
  }

  protected async init() {
    let stored = (await this.storage.get("state")) as TState | undefined;
    this.state = stored || ({} as any);
  }

  execute: RPCHandler<API, "execute"> = async (input) => {
    this.logger.debug(`${this} execution starting`, { input, aggregateId: this.aggregateId });

    const event: AddEventInput = getInObj(this.commands, input.command)(this.state, {
      payload: input.payload,
    });

    this.logger.debug(`${this} execution finished`, event);

    const reducedState = getInObj(this.reducers, event.kind)(this.state, {
      aggregateId: this.aggregateId,
      payload: event.payload,
    });

    this.logger.debug(`${this} state reduced`, reducedState);

    this.state = reducedState;
    await this.storage.put("state", reducedState);

    this.logger.debug(`${this} state stored`);

    this.logger.debug(`${this} adding event to event store`);

    await addEventToEventStore({
      env: this.env,
      event,
      aggregate: this.aggregate as any,
      aggregateId: this.aggregateId,
    });

    return {
      aggregateId: this.aggregateId,
    };
  };
}
