import { z, ZodTypeAny } from "zod";
import { Router } from "itty-router";

export type RpcRoutesApi = Record<string, { input: ZodTypeAny; output: ZodTypeAny }>;

export type RpcRoutesHandlers<TApi extends RpcRoutesApi, TEnv> = {
  [P in keyof TApi]: (
    input: z.infer<TApi[P]["input"]>,
    env: TEnv
  ) => Promise<z.infer<TApi[P]["output"]>> | z.infer<TApi[P]["output"]>;
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
