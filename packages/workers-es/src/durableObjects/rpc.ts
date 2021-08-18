import { z } from "zod";

export const RPCRequest = z.object({
  endpoint: z.string(),
  payload: z.unknown().optional(),
});

export interface RPCRequest extends z.infer<typeof RPCRequest> {}
