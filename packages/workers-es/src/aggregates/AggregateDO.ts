import { z } from "zod";
import { AggregateCommandHandlers } from "../commands/commands";
import { AggregateReducers } from "../reducers";
import { addEventToEventStore } from "../events/addEventToEventStore";
import { AddEventInput } from "../events/events";
import { RPCDurableObject } from "../durableObjects/RPCDurableObject";
import { ensure, getInObj, getLogger } from "@project/essentials";

export class AggreateDO<TState extends Record<string, any>> extends RPCDurableObject<
  typeof AggreateDO.api
> {
  static api = {
    execute: {
      input: z.object({
        command: z.string(),
        payload: z.any().optional(),
      }),
      output: z.object({}),
    },
  };

  constructor(
    objectState: DurableObjectState,
    env: any,
    aggregate: string,
    commands: AggregateCommandHandlers<TState>,
    reducers: AggregateReducers<TState>
  ) {
    let state: TState = {} as any;
    const logger = getLogger(`${aggregate}-aggregate`);

    const aggregateId = ensure(objectState.id.name);
    super({
      env,
      init: async () => {
        let stored = (await objectState.storage.get("state")) as TState | undefined;
        state = stored || ({} as any);
      },
      routes: {
        execute: async (input) => {
          logger.debug(`${this} execution starting`, { input, aggregateId });

          const event: AddEventInput = getInObj(commands, input.command)(state, {
            payload: input.payload,
          });

          logger.debug(`${this} execution finished`, event);

          const reducedState = getInObj(reducers, event.kind)(state, {
            aggregateId,
            payload: event.payload,
          });

          logger.debug(`${this} state reduced`, reducedState);

          state = reducedState;
          await objectState.storage.put("state", reducedState);

          logger.debug(`${this} state stored`);

          logger.debug(`${this} adding event to event store`);

          await addEventToEventStore({
            env: env,
            event,
            aggregate: aggregate as any,
            aggregateId,
          });

          return {};
        },
      },
    });
  }
}
