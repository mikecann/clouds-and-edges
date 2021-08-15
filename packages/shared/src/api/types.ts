import { AggregateNames } from "../aggregates/aggregates";
import { Commands } from "../commands/commands";

export interface ExecuteCommandApiEndpointPayload<
  TAggregateName extends AggregateNames,
  TCommand extends Extract<Commands, { aggregate: TAggregateName }>["kind"]
> {
  aggregate: TAggregateName;
  aggregateId?: string;
  command: TCommand;
  payload: Omit<
    Extract<Commands, { aggregate: TAggregateName; kind: TCommand }>,
    "aggregate" | "kind"
  >;
}
