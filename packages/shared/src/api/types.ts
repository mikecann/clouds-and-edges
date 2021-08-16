import { z } from "zod";
import { Fail, Success } from "../utils/response";

export type ApiEndpointResponse<T = any> = Success<T> | Fail;

export type AuthSignupResponse = { userId: string };

export const api = {
  v1: {
    auth: {
      signup: {
        post: {
          input: z.object({
            name: z.string(),
          }),
        },
      },
    },
    commands: {
      post: {
        input: z.object({
          aggregate: z.string(),
          aggregateId: z.string().optional(),
          command: z.string(),
          payload: z.any().optional(),
        }),
      },
    },
    projections: {
      user: {
        get: {
          input: z.object({
            userId: z.string(),
          }),
        },
      },
    },
  },
};
