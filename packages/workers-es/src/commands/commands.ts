export type AggregateCommandHandler<
  TState = unknown,
  TPayload = unknown,
  TEvents extends Kindable = Kindable
> = (context: {
  state: TState;
  timestamp: number;
  userId: string;
  payload: TPayload;
}) => TEvents | TEvents[];

type Kindable = { kind: string; payload: unknown };

export type AggregateCommandHandlers<
  TState = any,
  TCommands extends Kindable = Kindable,
  TEvents extends Kindable = Kindable
> = {
  [P in TCommands["kind"]]: AggregateCommandHandler<
    TState,
    Extract<TCommands, { kind: P }>["payload"],
    TEvents
  >;
};

export interface Command<
  TKind extends string = string,
  TAggregate extends string = string,
  TPayload extends unknown = unknown
> {
  kind: TKind;
  aggregate: TAggregate;
  aggregateId?: string;
  payload: TPayload;
}
