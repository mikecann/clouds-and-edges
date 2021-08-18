import { Event } from "@project/shared";
import { AddEventInput } from "./events";
import { z } from "zod";
import { onEventAddedToStore } from "./onEventAddedToStore";
import { Env } from "../../env";
import { BaseDurableObject } from "../durableObjects/BaseDurableObject";

const getEventId = (aggregate: string, aggregateId: string, index: number) =>
  `e:${aggregate}:${aggregateId}:${index}`;

export class EventStore extends BaseDurableObject<typeof EventStore.api> {
  static version = `1.0.5`;

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
    "query.events": {
      input: z.object({}),
      output: z.array(Event),
    },
  };

  constructor({ storage }: DurableObjectState, env: Env) {
    let eventIndex: number = 0;

    super({
      env,
      init: async () => {
        eventIndex = (await storage.get("eventIndex")) ?? 0;
      },
      routes: {
        add: async ({ aggregate, aggregateId, kind, payload }) => {
          const id = getEventId(aggregate, aggregateId, eventIndex);

          const event: Event = {
            id,
            kind,
            aggregate,
            aggregateId,
            createdAt: Date.now(), // not 100% sure how date now works in a DO, hopefully UTC will be okay everywhere
            payload,
          };

          console.log(`EventStore adding event`, event);

          // I think we need a better eventId here
          await storage.put(`eventIndex`, eventIndex++);
          await storage.put(id, event);

          // We now need to inform all projection and processes about the event but we dont
          // want to wait for them to finish as they could take a while.
          // I hope this is how it works in DOs
          onEventAddedToStore({ event, env });

          return {};
        },
        "query.events": async ({}) => {
          const contents = await storage.list({ limit: 100, prefix: "e:" });
          const events = [...contents.values()];
          return events as any;
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
