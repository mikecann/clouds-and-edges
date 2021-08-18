import { findInObj } from "../../../../shared/src";
import { Events } from "../../events";
import { ProjectionEventHandlers } from "../../lib/projections/projections";
import { BaseDurableObject } from "../../lib/durableObjects/BaseDurableObject";
import { z } from "zod";
import { Env } from "../../env";
import { Event } from "@project/shared";

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

  constructor({ storage }: DurableObjectState, env: Env) {
    super({
      env,
      init: async () => {},
      routes: {
        onEvent: async ({ event }) => {
          console.log(`UsersProjection handling event`, event);

          const handlers: ProjectionEventHandlers<Events> = {
            "user-created": async ({ event: { aggregateId, payload } }) => {
              console.log(`UsersProjection user-created`, aggregateId, payload);
              await storage.put(`user:${aggregateId}`, {
                id: aggregateId,
                name: (payload as any).name,
              });
              console.log(`UsersProjection stored`);
            },
            "user-name-set": async ({ event: { payload, aggregateId } }) => {
              console.log(`UsersProjection user-name-set`, aggregateId, payload);
              const user = await storage.get(`user:${aggregateId}`);
              await storage.put(`user:${aggregateId}`, {
                ...(user as any),
                name: (payload as any).name,
              });
              console.log(`UsersProjection updated user`);
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
          const val = await storage.get(`user:${id}`);
          console.log(`lookup response`, val);
          return val;
        },
      },
    });
  }
}
