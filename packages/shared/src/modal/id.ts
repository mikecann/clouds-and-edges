import { z } from "zod";

export const Id = z.string();
export type Id = z.infer<typeof Id>;
