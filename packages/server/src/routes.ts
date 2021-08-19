import { Router } from "itty-router";
import { API } from "@project/shared";
import { addRpcRoutes, executeCommand, callDurableObject } from "@project/workers-es";
import { generateId } from "@project/essentials";
import { Env } from "./env";
import { EventStore } from "./EventStore";

export const router = Router();

router.get("/", async () => {
  return new Response("Hello, World!");
});

addRpcRoutes<API, Env>({
  urlPrefix: `/api/v1/`,
  routes: {
    // "user.get": async (input, env) => {
    //   // Temp
    //   await wait(100);
    //
    //   return queryProjection({
    //     env,
    //     projection: "users",
    //     query: {
    //       ...input,
    //     },
    //   }) as any;
    // },
    projection: async (input, env) => {},
    "event-store.events": async (input, env) => {
      return callDurableObject({
        object: EventStore,
        stub: env.EventStore.get(env.EventStore.idFromName(EventStore.version)),
        input: {},
        endpoint: "query.events",
      }) as any;
    },
    "auth.signup": async (input, env) => {
      const userId = generateId();

      await executeCommand({
        namespace: env.UsersProjection,
        aggregate: "user",
        command: "create",
        env,
        payload: {
          name: input.name,
        },
        aggregateId: userId,
      });

      return {
        userId,
      };
    },
    command: async (input, env) => {
      return await executeCommand({
        namespace: aggregateToNamespace(input.aggregate as any, env),
        aggregate: input.aggregate as any,
        command: input.command,
        env,
        payload: input.payload,
        aggregateId: input.aggregateId,
      });
    },
  },
  router,
});

// 404 for everything else
router.all("*", () => new Response("Not Found.", { status: 404 }));

const aggregateToNamespace = (name: AggregateNames, env: Env) => {
  if (name == "user") return env.UserAggregate;
  throw new Error(`cannot get namespace '${name}'`);
};
