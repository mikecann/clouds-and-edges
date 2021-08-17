import { AggregateNames } from "@project/shared";
import { z } from "zod";

export interface AddEventInput {
  kind: string;
  payload?: unknown;
}

export const Event = z.object({
  kind: z.string(),
  aggregate: z.string(),
  aggregateId: z.string(),
  createdAt: z.number(),
  payload: z.unknown(),
});

export type Event = z.infer<typeof Event>;
