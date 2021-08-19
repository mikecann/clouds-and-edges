import { z } from "zod";
import { Env } from "../../env";
import { Event, projections, UserProjection } from "@project/shared";
import { findInObj, getLogger } from "@project/essentials";
import { ProjectionAdminState, RPCDurableObject } from "@project/workers-es";
import { getHandlers } from "./eventHandlers";

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
    ...projections.user,
  };

  constructor({ storage }: DurableObjectState, env: Env) {
    const handlers = getHandlers(storage);
    let adminState: ProjectionAdminState = {
      status: "not-built",
    };
    super(env, async () => {}, {
      onEvent: async ({ event }) => {
        logger.debug(`UsersProjection handling event`, event);

        const handler = findInObj(handlers, event.kind);
        if (!handler) {
          logger.debug(`projection unable to handle event '${event.kind}'`);
          return;
        }
        await handler({ event });
      },
      findUserById: async ({ id }) => {
        logger.debug(`handling query`, id);
        const val = await storage.get(`user:${id}`);
        logger.debug(`lookup response`, val);
        return val ? (val as UserProjection) : null;
      },
      "admin.getState": async ({}) => {
        return adminState;
      },
    });
  }
}
