import { Router } from "itty-router";

export const router = Router();

router.get("/", async () => {
  return new Response("Hello, World!");
});

router.post(`/api/v1/executeCommand`, async ({ json }) => {

  const aggregate = path[3];
  const aggregateId = path[4] ?? generateId();
  const aggregateCommand = path[5];
  const payload = await request.json();

  return new Response("Hello, World!");
});

// 404 for everything else
router.all('*', () => new Response('Not Found.', { status: 404 }))