import { useRPCOperation } from "./useRPCOperation";
import { AggregateKinds, Aggregates } from "@project/shared";

export const useCommand = <
  TAggreate extends AggregateKinds,
  TOperation extends Aggregates[TAggreate]["kind"]
>(
  aggregate: TAggreate,
  command: TOperation,
  aggregateId?: string
) => {
  const _command = useRPCOperation("command");
  return (payload: Extract<Aggregates[TAggreate], { kind: TOperation }>["payload"]) =>
    _command({ aggregate, command, payload, aggregateId });
};
