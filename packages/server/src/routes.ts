import { Router } from "itty-router";
import { AggregateKinds, API } from "@project/shared";
import { executeCommand, addRpcRoutes, createDurableObjectRPCProxy } from "@project/workers-es";
import { wait } from "@project/essentials";
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
    "projections.users.findUserById": async (input, env) => {
      // Temp
      await wait(100);
      return createDurableObjectRPCProxy(
        UsersProjection,
        env.UsersProjection.get(env.UsersProjection.idFromName(`1`))
      ).findUserById({
        id: input.id,
      });
    },
    "projections.users.getAdminState": async (input, env) => {
      return createDurableObjectRPCProxy(
        UsersProjection,
        env.UsersProjection.get(env.UsersProjection.idFromName(`1`))
      ).getAdminState({});
    },
    "projections.users.rebuild": async (input, env) => {
      return createDurableObjectRPCProxy(
        UsersProjection,
        env.UsersProjection.get(env.UsersProjection.idFromName(`1`))
      ).rebuild({});
    },
    "projections.users.getStorageContents": async (input, env) => {
      return createDurableObjectRPCProxy(
        UsersProjection,
        env.UsersProjection.get(env.UsersProjection.idFromName(`1`))
      ).getStorageContents({});
    },
    "event-store.events": async (input, env) => {
      return createDurableObjectRPCProxy(
        EventStore,
        env.EventStore.get(env.EventStore.idFromName(`1`))
      ).getEvents({});
    },
    "auth.signup": async (input, env) => {
      const userId = env.UserAggregate.newUniqueId().toString();

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
      return (await executeCommand({
        namespace: aggregateToNamespace(input.aggregate as any, env),
        aggregate: input.aggregate as any,
        command: input.command,
        env,
        payload: input.payload,
        aggregateId: input.aggregateId,
      })) as any;
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
