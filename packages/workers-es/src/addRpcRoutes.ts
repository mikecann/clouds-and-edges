import { Router } from "itty-router";
import { iife } from "@project/essentials";

export type RpcRoutesApi = Record<string, { input: unknown; output: unknown }>;

export type RpcRoutesHandlers<TApi extends RpcRoutesApi, TEnv> = {
  [P in keyof TApi]: (
    input: TApi[P]["input"],
    env: TEnv,
    userId?: string
  ) => Promise<TApi[P]["output"]> | TApi[P]["output"];
};

interface Options<TApi extends RpcRoutesApi, TEnv> {
  urlPrefix?: string;
  routes: RpcRoutesHandlers<TApi, TEnv>;
  router: Router<unknown>;
}

export const addRpcRoutes = <TApi extends RpcRoutesApi, TEnv>({
  routes,
  urlPrefix = `/`,
  router,
}: Options<TApi, TEnv>) => {
  for (const endpoint in routes) {
    router.post(`${urlPrefix}${endpoint}`, async (request, env) => {
      const userId = iife(() => {
        const headers: Headers = (request as any).headers;
        const authorization = headers.get("Authorization");
        if (!authorization) return undefined;
        const parts = authorization.split("Bearer");
        if (parts.length < 2) return undefined;
        return parts[1].trim();
      });
      const json = await request.json!();
      const response = await routes[endpoint](json, env, userId);
      return new Response(JSON.stringify(response));
    });
  }
};
