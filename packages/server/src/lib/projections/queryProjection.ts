import { Env } from "../../env";
import { UsersProjection } from "../../projections/users/UsersProjection";
import { callDurableObject } from "../durableObjects/callDurableObject";

interface Options {
  env: Env;
  projection: string;
  query: unknown;
}

export const queryProjection = async ({ env, projection, query }: Options) => {
  console.log(`querying projection`, {
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
