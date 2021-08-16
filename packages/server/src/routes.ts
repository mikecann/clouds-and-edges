import { Router } from "itty-router";
import { api, wait, ApiEndpointResponse, AuthSignupResponse, generateId } from "@project/shared";
import { Env } from "./env";
import { executeCommand } from "./lib/executeCommand";
import { queryProjection } from "./lib/queryProjection";

export const router = Router();

router.get("/", async () => {
  return new Response("Hello, World!");
});

router.post(`/api/v1/auth/signup`, async (request, env: Env) => {
  console.log(`starting signup`);

  const input = api.v1.auth.signup.post.input.parse(await request.json!());

  const userId = generateId();

  const response = await executeCommand({
    aggregate: "user",
    command: "create",
    env,
    payload: {
      name: input.name,
    },
    aggregateId: userId,
  });

  if (response.kind != `success`) throw new Error(`Failed to signup user: ${response.message}`);

  const json: ApiEndpointResponse<AuthSignupResponse> = {
    kind: `success`,
    payload: {
      userId,
    },
  };

  return new Response(JSON.stringify(json));
});

router.post(`/api/v1/commands`, async (request, env: Env) => {
  const input = api.v1.commands.post.input.parse(await request.json!());

  const response = await executeCommand({
    aggregate: input.aggregate as any,
    command: input.command,
    env,
    payload: input.payload,
    aggregateId: input.aggregateId,
  });

  return new Response(
    JSON.stringify({
      kind: `success`,
      payload: response,
    })
  );
});

router.get(`/api/v1/projections/users/:userId`, async (request, env) => {
  // Temp
  await wait(100);

  const resp = await queryProjection({
    env,
    projection: "users",
    query: {
      ...request.params,
    },
  });

  return new Response(JSON.stringify(resp));
});

// 404 for everything else
router.all("*", () => new Response("Not Found.", { status: 404 }));
