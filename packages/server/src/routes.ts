import { Router } from "itty-router";
import { AggregateKinds, API } from "@project/shared";
import { addRpcRoutes, executeCommand, callDurableObject } from "@project/workers-es";
import { generateId, wait } from "@project/essentials";
import { Env } from "./env";
import { EventStore } from "./EventStore";
import { UsersProjection } from "./projections/users/UsersProjection";

export const router = Router();

router.get("/", async () => {
  return new Response("Hello, World!");
});

addRpcRoutes<API, Env>({
  urlPrefix: `/api/v1/`,
  routes: {
    "user.findUserById": async (input, env) => {
      // Temp
      await wait(100);
      return await callDurableObject({
        stub: env.UsersProjection.get(env.UsersProjection.idFromName(UsersProjection.version)),
        object: UsersProjection,
        endpoint: "findUserById",
        input,
      });
    },
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
        namespace: env.UserAggregate,
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

const aggregateToNamespace = (name: AggregateKinds, env: Env) => {
  if (name == "user") return env.UserAggregate;
  throw new Error(`cannot get namespace '${name}'`);
};
