import { findInObj } from "../../../../shared/src";
import { Events } from "../../events";
import { Event } from "../../lib/events/events";
import { ProjectionEventHandlers } from "../../lib/projections/projections";
import { BaseDurableObject } from "../../lib/durableObjects/BaseDurableObject";
import { z } from "zod";
import { Env } from "../../env";

interface ProjectionState {}

export class UsersProjection extends BaseDurableObject<typeof UsersProjection.api> {
  static version = `1.0.0`;

  static api = {
    onEvent: {
      input: z.object({
        event: Event,
      }),
      output: z.object({}),
    },
    query: {
      input: z.object({
        id: z.string(),
      }),
      output: z.object({}),
    },
  };

  constructor(objectState: DurableObjectState, env: Env) {
    super({
      env,
      init: async () => {},
      routes: {
        onEvent: async ({ event }) => {
          console.log(`UsersProjection handling event`, event);

          const handlers: ProjectionEventHandlers<Events> = {
            "user-created": async ({ event: { aggregateId, payload } }) => {
              console.log(`UsersProjection user-created`, aggregateId, payload);
              await objectState.storage.put(`user:${aggregateId}`, {
                id: aggregateId,
                name: (payload as any).name,
              });
              console.log(`UsersProjection stored`);
            },
          };

          const handler = findInObj(handlers, event.kind);
          if (!handler) {
            console.log(`projection unable to handle event '${event.kind}'`);
            return;
          }
          await handler({ event });
        },
        query: async ({ id }) => {
          console.log(`handling query`, id);
          const val = await objectState.storage.get(`user:${id}`);
          console.log(`lookup response`, val);
          return val;
        },
      },
    });
  }
}
