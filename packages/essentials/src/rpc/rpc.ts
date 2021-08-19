import { z, ZodObject } from "zod";

export interface RPCOperation {
  input: ZodObject<any>;
  output: ZodObject<any>;
}

export type RPCOperations = Record<string, RPCOperation>;

export type OperationNames = keyof RPCOperations;

export type OperationInput<
  TApi extends RPCOperations,
  TOperation extends OperationNames = string
> = z.infer<TApi[TOperation]["input"]>;

export type OperationOutput<
  TApi extends RPCOperations,
  TOperation extends OperationNames = string
> = z.infer<RPCOperations[TOperation]["output"]>;
