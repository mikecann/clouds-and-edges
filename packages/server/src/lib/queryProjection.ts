import { Env } from "../env";
import { EventStore } from "./EventStore";

interface Options {
  env: Env;
  projection: string;
  query: unknown;
}

export const queryProjection = async ({ env, projection, query }: Options) => {
  const stub = env.UsersProjection.get(env.UsersProjection.idFromName(`v1`));

  console.log(`querying projection`, {
    projection,
    query,
  });

  const response = await stub
    .fetch(`query`, {
      method: "POST",
      body: JSON.stringify(query),
    })
    .then(r => r.json());

  console.log(`projection query response`, response);

  return response;
};
