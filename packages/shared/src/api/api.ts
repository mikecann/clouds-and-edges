import { z } from "zod";
import { Event } from "../events/events";
import { projections } from "../projections/projections";

export const api = {
  "projection.user.findUserById": projections.user.findUserById,
  "projection.user.admin.getState": projections.user["admin.getState"],
  "event-store.events": {
    input: z.object({}),
    output: z.array(Event),
  },
  "auth.signup": {
    input: z.object({
      name: z.string(),
    }),
    output: z.object({
      userId: z.string(),
    }),
  },
  command: {
    input: z.object({
      aggregate: z.string(),
      aggregateId: z.string().optional(),
      command: z.string(),
      payload: z.any().optional(),
    }),
    output: z.object({}),
  },
};

export type API = typeof api;

export type APIOperations = keyof API;

export type APIOperationInput<TOperation extends APIOperations> = z.infer<API[TOperation]["input"]>;
export type APIOperationOutput<TOperation extends APIOperations> = z.infer<
  API[TOperation]["output"]
>;
