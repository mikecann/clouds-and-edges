import { z } from "zod";
import {
  Fail,
  OperationInput,
  OperationNames,
  RPCOperation,
  RPCOperations,
  Success,
} from "@project/essentials";
import { Event } from "../events/events";
import { projections } from "../projections/projections";

// export type ApiEndpointResponse<T = any> = Success<T> | Fail;

export const api = {
  "user.findUserById": projections.user.findUserById,
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
