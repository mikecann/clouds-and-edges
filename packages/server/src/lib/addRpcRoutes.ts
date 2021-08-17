import { z, ZodTypeAny } from "zod";
import { Router } from "itty-router";
import { Env } from "../env";

export type RpcRoutesApi = Record<string, { input: ZodTypeAny; output: ZodTypeAny }>;

export type RpcRoutesHandlers<TApi extends RpcRoutesApi> = {
  [P in keyof TApi]: (
    input: z.infer<TApi[P]["input"]>,
    env: Env
  ) => Promise<z.infer<TApi[P]["output"]>> | z.infer<TApi[P]["output"]>;
};

interface Options<TApi extends RpcRoutesApi> {
  urlPrefix?: string;
  routes: RpcRoutesHandlers<TApi>;
  router: Router<unknown>;
}

export const addRpcRoutes = <TApi extends RpcRoutesApi>({
  routes,
  urlPrefix = `/`,
  router,
}: Options<TApi>) => {
  for (let endpoint in routes) {
    router.post(`${urlPrefix}${endpoint}`, async (request, env) => {
      const json = await request.json!();
      const response = await routes[endpoint](json, env);
      return new Response(
        JSON.stringify({
          kind: `success`,
          payload: response,
        })
      );
    });
  }
};
