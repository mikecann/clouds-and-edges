import { Router } from "itty-router";
import { wait, API } from "@project/shared";
import { executeCommand } from "./lib/commands/executeCommand";
import { queryProjection } from "./lib/projections/queryProjection";
import { addRpcRoutes } from "./lib/addRpcRoutes";

export const router = Router();

router.get("/", async () => {
  return new Response("Hello, World!");
});

addRpcRoutes<API["query"]>({
  urlPrefix: `/api/v1/query/`,
  routes: {
    "user.get": async (input, env) => {
      // Temp
      await wait(100);

      return queryProjection({
        env,
        projection: "users",
        query: {
          ...input,
        },
      });
    },
  },
  router,
});

addRpcRoutes<API["mutation"]>({
  urlPrefix: `/api/v1/mutation/`,
  routes: {
    "auth.signup": async (input, env) => {
      const userId = env.UserAggregate.newUniqueId().toString();

      await executeCommand({
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
