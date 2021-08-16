import { z } from "zod";

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
  },
};
