import { Router } from "itty-router";

export type RpcRoutesApi = Record<string, { input: unknown; output: unknown }>;

export type RpcRoutesHandlers<TApi extends RpcRoutesApi, TEnv> = {
  [P in keyof TApi]: (
    input: TApi[P]["input"],
    env: TEnv
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
  for (let endpoint in routes) {
    router.post(`${urlPrefix}${endpoint}`, async (request, env) => {
      const json = await request.json!();
      const response = await routes[endpoint](json, env);
      return new Response(JSON.stringify(response));
    });
  }
};
