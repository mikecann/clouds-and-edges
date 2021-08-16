import { Router } from "itty-router";
import { api, getInObj } from "@project/shared";
import { EnvInterface } from "./env";
import { executeCommand } from "./lib/executeCommand";

export const router = Router();

router.get("/", async () => {
  return new Response("Hello, World!");
});

router.post(`/api/v1/auth/signup`, async (request, env: EnvInterface) => {
  const input = api.v1.auth.signup.post.input.parse(await request.json!());

  const userId = env.UserAggregate.newUniqueId().toString();

  const response = await executeCommand({
    aggregate: "user",
    command: "create",
    env,
    payload: {},
    aggregateId: userId,
  });

  if (response.kind != `success`) throw new Error(`Failed to signup user: ${response.message}`);

  return new Response(
    JSON.stringify({
      kind: `success`,
      payload: {
        userId,
      },
    })
  );
});

router.post(`/api/v1/commands`, async (request, env: EnvInterface) => {
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

// 404 for everything else
router.all("*", () => new Response("Not Found.", { status: 404 }));
