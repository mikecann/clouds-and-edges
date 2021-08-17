import { z } from "zod";
import { Id } from "../modal/id";
export type ProjectionNames = "user";

export const UserProjection = z.object({
  id: Id,
  name: z.string(),
});

export interface UserProjection extends z.infer<typeof UserProjection> {}
