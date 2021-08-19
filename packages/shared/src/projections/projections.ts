import { z } from "zod";
import { Id } from "@project/shared";

export const UserProjection = z.object({
  id: Id,
  name: z.string(),
});

export interface UserProjection extends z.infer<typeof UserProjection> {}

export const projections = {
  user: {
    findUserById: {
      input: z.object({
        id: z.string(),
      }),
      output: z.union([UserProjection, z.null()]),
    },
  },
};

export type ProjectionKinds = keyof typeof projections;
