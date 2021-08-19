import { z } from "zod";
import { Fail, Success } from "@project/essentials";
import { Event } from "../events/events";

export type ApiEndpointResponse<T = any> = Success<T> | Fail;

export const api = {
  projection: {
    input: z.object({
      name: z.string(),
      payload: z.unknown(),
    }),
    output: z.unknown(), // todo type this better
  },
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
