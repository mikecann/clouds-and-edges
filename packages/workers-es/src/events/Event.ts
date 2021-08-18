import { z } from "zod";

export const Event = z.object({
  id: z.string(),
  kind: z.string(),
  aggregate: z.string(),
  aggregateId: z.string(),
  createdAt: z.number(),
  payload: z.unknown(),
});

export type Event = z.infer<typeof Event>;
