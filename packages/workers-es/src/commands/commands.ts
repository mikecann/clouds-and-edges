export type AggregateCommandHandler<TState, TPayload, TEvents extends Kindable> = (
  state: TState,
  context: { timestamp: number; userId: string; payload: TPayload }
) => TEvents;

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
