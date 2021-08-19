import { z } from "zod";

export const aggregates = {
  user: {
    xxx: {
      input: z.object({
        name: z.string(),
      }),
      output: z.object({
        userId: z.string(),
      }),
    },
  },
};

export type AggregateKinds = keyof typeof aggregates;
