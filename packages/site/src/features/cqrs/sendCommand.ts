import { AggregateNames, Commands } from "@project/shared";

export const sendCommand = async <
  TAggregate extends AggregateNames,
  TCommand extends Extract<Commands, { aggregate: TAggregate }>["kind"]
>({
  aggregate,
  aggregateId,
  command,
  payload,
}: {
  aggregate: TAggregate;
  aggregateId?: string;
  command: TCommand;
  payload: Omit<Extract<Commands, { aggregate: TAggregate; kind: TCommand }>, "aggregate" | "kind">;
}) => {
  const response = await fetch(`http://localhost:8777/api/v1/commands`, {
    method: "POST",
    body: JSON.stringify({ aggregate, aggregateId, command, payload }),
  });
  const json = await response.text();
  console.log(json);
};
