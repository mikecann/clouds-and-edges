import { getInObj, AggregateNames } from "@project/shared";
import { z } from "zod";
import { AggregateCommandHandlers } from "../commands/commands";
import { AggregateReducers } from "../reducers";
import { Env } from "../../env";
import { addEventToEventStore } from "../events/addEventToEventStore";
import { AddEventInput } from "../events/events";
import { BaseDurableObject } from "../durableObjects/BaseDurableObject";

export class AggreateDO<TState extends Record<string, any>> extends BaseDurableObject<
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
    env: Env,
    aggregate: AggregateNames,
    commands: AggregateCommandHandlers<TState>,
    reducers: AggregateReducers<TState>
  ) {
    let state: TState = {} as any;
    super({
      env,
      init: async () => {
        let stored = (await objectState.storage.get("state")) as TState | undefined;
        state = stored || ({} as any);
      },
      routes: {
        execute: async input => {
          console.log(`${this} execution starting`, { input, id: objectState.id.toString() });

          const event: AddEventInput = getInObj(commands, input.command)(state, {
            payload: input.payload,
          });

          console.log(`${this} execution finished`, event);

          const reducedState = getInObj(reducers, event.kind)(state, {
            aggregateId: objectState.id.toString(),
            payload: event.payload,
          });

          console.log(`${this} state reduced`, reducedState);

          state = reducedState;
          await objectState.storage.put("state", reducedState);

          console.log(`${this} state stored`);

          console.log(`${this} adding event to event store`);

          await addEventToEventStore({
            env: env,
            event,
            aggregate: aggregate,
            aggregateId: objectState.id.toString(),
          });

          return {};
        },
      },
    });
  }
}
