import { AggregateNames, generateId, getInObj } from "@project/shared";
import { Event, AddEventInput } from "./events";
import { z } from "zod";
import { onEventAddedToStore } from "./onEventAddedToStore";
import { Env } from "../../env";
import { BaseDurableObject } from "../durableObjects/BaseDurableObject";

const getStoreKey = (eventId: string, aggregate: string, aggregateId: string) =>
  `e:${aggregate}:${aggregateId}:${eventId}`;

export class EventStore extends BaseDurableObject<typeof EventStore.api> {
  static version = `1.0.0`;

  static api = {
    add: {
      input: z.object({
        aggregate: z.string(),
        aggregateId: z.string(),
        kind: z.string(),
        payload: z.unknown(),
      }),
      output: z.object({}),
    },
  };

  constructor(objectState: DurableObjectState, env: Env) {
    super({
      env,
      init: async () => {},
      routes: {
        add: async ({ aggregate, aggregateId, kind, payload }) => {
          const eventId = generateId();

          const key = getStoreKey(eventId, aggregate, aggregateId);

          const event: Event = {
            kind,
            aggregate,
            aggregateId,
            createdAt: Date.now(), // not 100% sure how date now works in a DO, hopefully UTC will be okay everywhere
            payload,
          };

          console.log(`EventStore adding event`, event);

          // I think we need a better eventId here
          await objectState.storage.put(key, event);

          // We now need to inform all projection and processes about the event but we dont
          // want to wait for them to finish as they could take a while.
          // I hope this is how it works in DOs
          onEventAddedToStore({ event, env });

          return {};
        },
      },
    });
  }
}

export const getEventStore = (env: Env) => env.EventStore.get(env.EventStore.idFromName(`v1`));

export interface AddEventRequest {
  aggregate: string;
  aggregateId: string;
  input: AddEventInput;
}
