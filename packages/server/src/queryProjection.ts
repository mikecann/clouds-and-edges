import { callDurableObject } from "@project/workers-es";
import { getLogger } from "@project/essentials";
import { UsersProjection } from "./projections/users/UsersProjection";

interface Options {
  env: any;
  projection: string;
  query: unknown;
}

const logger = getLogger(`queryProjection`);

export const queryProjection = async ({ env, projection, query }: Options) => {
  logger.debug(`querying projection`, {
    projection,
    query,
  });

  return await callDurableObject({
    stub: env.UsersProjection.get(env.UsersProjection.idFromName(UsersProjection.version)),
    object: UsersProjection,
    endpoint: "query",
    input: query as any,
  });
};
