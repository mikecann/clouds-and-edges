import { useMutation, UseMutationOptions } from "react-query";
import { useRPCOperation } from "./useRPCOperation";
import { useGenericErrorHandler } from "../errors/useGenericErrorHandler";
import { APIOperationInput, APIOperationOutput, APIOperations } from "@project/shared";

export const useApiMutation = <TOperation extends APIOperations>(
  operation: TOperation,
  options?: UseMutationOptions<APIOperationOutput<TOperation>, Error, APIOperationInput<TOperation>>
) => {
  const onError = useGenericErrorHandler();
  return useMutation(useRPCOperation(operation), {
    onError,
    ...options,
  });
};
