import { Router } from "itty-router";
import { AggregateKinds, API, ProjectionKinds } from "@project/shared";
import { executeCommand, addRpcRoutes, createDurableObjectRPCProxy } from "@project/workers-es";
import { ensure, wait } from "@project/essentials";
import { Env } from "./env";
import { EventStore } from "./EventStore";
import { UsersProjection } from "./projections/users/UsersProjection";
import { matchLiteral } from "variant";
import { ProposalsProjection } from "./projections/proposals/ProposalsProjection";
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
      return createDurableObjectRPCProxy(
        UsersProjection,
        env.UsersProjection.get(env.UsersProjection.idFromName(`1`))
      ).findUserById({
        id: input.id,
      });
    },
    "projection.admin": async (input, env) => {
      const namespace = projectionToNamespace(input.projection, env);
      return createDurableObjectRPCProxy({} as any, namespace.get(namespace.idFromName(`1`)))[
        input.operation
      ](input.payload);
    },
    "projections.proposals.getProposals": async (input, env, userId) => {
      return createDurableObjectRPCProxy(
        ProposalsProjection,
        env.ProposalsProjection.get(env.ProposalsProjection.idFromName(`1`))
      ).getProposals({
        userId: ensure(userId),
      });
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
      const namespace = aggregateToNamespace(input.aggregate, env);
      return (await executeCommand({
        system,
        command: {
          aggregateId: input.aggregateId ?? namespace.newUniqueId().toString(),
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

const aggregateToNamespace = (name: AggregateKinds, env: Env) =>
  matchLiteral(name, {
    user: () => env.UserAggregate,
    proposal: () => env.ProposalAggregate,
    match: () => env.MatchAggregate,
  });

const projectionToNamespace = (name: ProjectionKinds, env: Env) =>
  matchLiteral(name, {
    users: () => env.UsersProjection,
    proposals: () => env.ProposalsProjection,
  });
