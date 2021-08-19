import { z } from "zod";
import { Id } from "@project/shared";
import { ProjectionAdminState } from "@project/workers-es";

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
    "admin.getState": {
      input: z.object({}),
      output: ProjectionAdminState,
    },
  },
};

export type ProjectionKinds = keyof typeof projections;
