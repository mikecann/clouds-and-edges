import { Router } from "itty-router";
import { AggregateKinds, API, ProcessKinds, ProjectionKinds } from "@project/shared";
import { executeCommand, addRpcRoutes } from "@project/workers-es";
import { ensure, matchKind, wait } from "@project/essentials";
import { Env } from "./env";
import { system } from "./system";

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
      return system.getProjection("users", env).findUserById(input);
    },

    // Todo: put this in es-worker
    "admin.queryStorage": async ({ identifier, input }, env) => {
      return matchKind(identifier, {
        projection: ({ name }) =>
          system.getProjection(name as ProjectionKinds, env).queryStorage(input),
        aggregate: ({ name, id }) =>
          system.getAggregate(name as AggregateKinds, env, id).queryStorage(input),
        process: ({ name }) => system.getProcess(name as ProcessKinds, env).queryStorage(input),
        eventStore: () => system.getEventStore(env).queryStorage(input),
      });
    },
    // Todo: put this in es-worker
    "admin.rebuild": async ({ identifier, input }, env) => {
      return matchKind(identifier, {
        projection: ({ name }) => system.getProjection(name as ProjectionKinds, env).rebuild(input),
        aggregate: ({ name, id }) => {
          throw new Error(`Cannot rebuild an aggregate`);
        },
        process: ({ name }) => {
          throw new Error(`Not implemented`);
        },
        eventStore: () => {
          throw new Error(`Cannot rebuild the event store`);
        },
      });
    },
    "projections.matches.getMine": async (input, env, userId) => {
      return system.getProjection("matches", env).getForPlayer({ playerId: ensure(userId) });
    },
    "projections.matches.getMatch": async (input, env, userId) => {
      return system.getProjection("matches", env).getMatch({ id: input.id });
    },
    "projections.matches.getOpen": async (input, env, userId) => {
      return system.getProjection("matches", env).getOpen({ userId: ensure(userId) });
    },
    "event-store.events": async (input, env) => {
      return system.getEventStore(env).getEvents({});
    },
    "auth.signup": async (input, env) => {
      const userId = env.UserAggregate.newUniqueId().toString();

      await executeCommand({
        system,
        command: {
          aggregateId: userId,
          payload: {
            name: input.name,
          },
          kind: "create",
          aggregate: "user",
        },
        env,
        userId,
      });

      return {
        userId,
      };
    },
    command: async (input, env, userId) => {
      return (await executeCommand({
        system,
        command: {
          aggregateId: input.aggregateId,
          payload: input.payload,
          kind: input.command,
          aggregate: input.aggregate,
        },
        env,
        userId: ensure(userId),
      })) as any;
    },
  },
  router,
});

router.options("*", () => new Response("Is Okay", { status: 200 }));

// 404 for everything else
router.all("*", () => new Response("Not Found.", { status: 404 }));
