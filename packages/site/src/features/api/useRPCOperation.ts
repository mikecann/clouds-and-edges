import { APIOperations } from "@project/shared";
import { performRPCOperation } from "./performRPCOperation";
import { useAuthToken } from "../auth/useAuthToken";

export const useRPCOperation = <TOperation extends APIOperations>(operation: TOperation) => {
  const token = useAuthToken();
  return performRPCOperation(operation, token);
};
