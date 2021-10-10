import { useMutation, useQuery, QueryKey, UseQueryOptions } from "react-query";
import { useGenericErrorHandler } from "../errors/useGenericErrorHandler";
import { APIOperationInput, APIOperationOutput, APIOperations } from "@project/shared";
import { useRPCOperation } from "./useRPCOperation";

export type ApiQueryOptions<TOperation extends APIOperations> = UseQueryOptions<
  APIOperationOutput<TOperation>,
  Error
>;

interface Options<TOperation extends APIOperations> {
  key: QueryKey;
  endpoint: TOperation;
  input: APIOperationInput<TOperation>;
  options?: ApiQueryOptions<TOperation>;
}

export const useApiQuery = <TOperation extends APIOperations>({
  key,
  options,
  endpoint,
  input,
}: Options<TOperation>) => {
  const onError = useGenericErrorHandler();
  const operation = useRPCOperation(endpoint);

  return useQuery<APIOperationOutput<TOperation>, Error>(key, () => operation(input), {
    onError,
    ...options,
  });
};
