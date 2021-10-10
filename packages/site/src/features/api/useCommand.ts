import { useRPCOperation } from "./useRPCOperation";
import { AggregateKinds, Aggregates } from "@project/shared";
import { useGenericErrorHandler } from "../errors/useGenericErrorHandler";
import { useMutation, UseMutationOptions } from "react-query";
import { CommandExecutionResponse } from "@project/workers-es";

interface Options<
  TAggreate extends AggregateKinds,
  TOperation extends Aggregates[TAggreate]["kind"]
> {
  aggregate: TAggreate;
  command: TOperation;
  aggregateId?: string;
  options?: UseMutationOptions<
    CommandExecutionResponse,
    Error,
    Extract<Aggregates[TAggreate], { kind: TOperation }>["payload"]
  >;
}

export const useCommand = <
  TAggreate extends AggregateKinds,
  TOperation extends Aggregates[TAggreate]["kind"]
>({
  command,
  aggregateId,
  aggregate,
  options,
}: Options<TAggreate, TOperation>) => {
  type Payload = Extract<Aggregates[TAggreate], { kind: TOperation }>["payload"];

  const _command = useRPCOperation("command");
  const onError = useGenericErrorHandler();
  return useMutation<CommandExecutionResponse, Error, Payload>(
    (payload: Payload) => _command({ aggregate, command, payload, aggregateId }) as any,
    {
      onError,
      ...options,
    }
  );
};
