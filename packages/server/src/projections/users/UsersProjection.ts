import { Events } from "../../events";
import { z } from "zod";
import { Env } from "../../env";
import { Event } from "@project/shared";
import { findInObj, getLogger } from "@project/essentials";
import { ProjectionEventHandlers, RPCDurableObject } from "@project/workers-es";

const logger = getLogger(`UsersProjection`);

export class UsersProjection extends RPCDurableObject<typeof UsersProjection.api, Env> {
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
    "admin.getState": {
      input: z.object({}),
      output: z.object({}),
    },
    "admin.rebuild": {
      input: z.object({}),
      output: z.object({}),
    },
  };

  constructor({ storage }: DurableObjectState, env: Env) {
    super(env, async () => {}, {
      onEvent: async ({ event }) => {
        logger.debug(`UsersProjection handling event`, event);

        const handlers: ProjectionEventHandlers<Events> = {
          "user-created": async ({ event: { aggregateId, payload } }) => {
            logger.debug(`UsersProjection user-created`, aggregateId, payload);
            await storage.put(`user:${aggregateId}`, {
              id: aggregateId,
              name: (payload as any).name,
            });
            logger.debug(`UsersProjection stored`);
          },
          "user-name-set": async ({ event: { payload, aggregateId } }) => {
            logger.debug(`UsersProjection user-name-set`, aggregateId, payload);
            const user = await storage.get(`user:${aggregateId}`);
            await storage.put(`user:${aggregateId}`, {
              ...(user as any),
              name: (payload as any).name,
            });
            logger.debug(`UsersProjection updated user`);
          },
        };

        const handler = findInObj(handlers, event.kind);
        if (!handler) {
          logger.debug(`projection unable to handle event '${event.kind}'`);
          return;
        }
        await handler({ event });
      },
      query: async ({ id }) => {
        logger.debug(`handling query`, id);
        const val = await storage.get(`user:${id}`);
        logger.debug(`lookup response`, val);
        return val;
      },
      "admin.getState": async ({}) => {
        return {};
      },
      "admin.rebuild": async ({}) => {
        return {};
      },
    });
  }
}
