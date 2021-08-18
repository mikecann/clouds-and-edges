import { Env } from "./env";
import { router } from "./routes";

// In order for the workers runtime to find the class that implements
// our Durable Object namespace, we must export it from the root module.
export { UserAggregate } from "./aggregates/user/UserAggregate";
export { UsersProjection } from "./projections/users/UsersProjection";
export { EventStore } from "./EventStore";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      const response = await router.handle(request, env);
      if (response) response.headers.set("Access-Control-Allow-Origin", "*");
      return response;
    } catch (e) {
      console.error(e);
      const response = new Response(e.message);
      response.headers.set("Access-Control-Allow-Origin", "*");
      return response;
    }
  },
  // fetch: router.handle
};

/*
async function handleRequest(request: Request, env: EnvInterface): Promise<Response> {
  let url = new URL(request.url);
  let path = url.pathname.slice(1).split("/");

  if (path[0] != "api") throw new Error("Invalid API path");

  if (path[1] != `v1`) throw new Error("Invalid API version");

  if (path[2] != "command") throw new Error("Invalid API operation");

  const aggregate = path[3];
  const aggregateId = path[4] ?? generateId();
  const aggregateCommand = path[5];
  const payload = await request.json();

  if (aggregate != "User") throw new Error(`Invalid aggregate name ${aggregate}`);

  if (!aggregateCommand) throw new Error(`Invalid aggregate command ${aggregateCommand}`);

  console.log(`got aggregate command..`, {
    aggregate,
    aggregateId,
    aggregateCommand,
    payload,
  });

  const objId = env.UserAggregate.idFromName(aggregateId);
  const aggregateObj = env.UserAggregate.get(objId);
  const resp = await aggregateObj.fetch(aggregateCommand, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  const text = await resp.text();

  const response = new Response(`Aggregate returned ${text}`);
  response.headers.set("Access-Control-Allow-Origin", "*");

  return response;
}
*/
