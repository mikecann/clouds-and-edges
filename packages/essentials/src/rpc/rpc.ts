import { z, ZodObject } from "zod";

export interface RPCOperation {
  input: ZodObject<any>;
  output: ZodObject<any>;
}

export type RPCOperations = Record<string, RPCOperation>;

export type OperationNames = keyof RPCOperations;

export type OperationInput<
  TApi extends RPCOperations,
  TOperation extends keyof TApi = string
> = z.infer<TApi[TOperation]["input"]>;

export type OperationOutput<
  TApi extends RPCOperations,
  TOperation extends keyof TApi = string
> = z.infer<TApi[TOperation]["output"]>;

// export const RPCRequest = z.object({
//   endpoint: z.string(),
//   payload: z.unknown().optional(),
// });
//
// export interface RPCRequest extends z.infer<typeof RPCRequest> {}
//
// export const RPCSuccessResponse = z.object({
//   kind: z.literal("success"),
//   payload: z.unknown().optional(),
// });
//
// export type RPCSuccessResponse = z.infer<typeof RPCSuccessResponse>;
//
// export const RPCFailResponse = z.object({
//   kind: z.literal("fail"),
//   message: z.string(),
// });
// export type RPCFailResponse = z.infer<typeof RPCFailResponse>;
//
// export const RPCResponse = z.union([RPCSuccessResponse, RPCFailResponse]);
//
// export type RPCResponse = z.infer<typeof RPCResponse>;
