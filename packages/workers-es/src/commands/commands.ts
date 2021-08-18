export type AggregateCommandHandler<TState, TPayload, TEvents extends Kindable> = (
  state: TState,
  context: { payload: TPayload }
) => TEvents;

type Kindable = { kind: string };

export type AggregateCommandHandlers<
  TState = any,
  TCommands extends Kindable = Kindable,
  TEvents extends Kindable = Kindable
> = {
  [P in TCommands["kind"]]: AggregateCommandHandler<
    TState,
    Omit<Extract<TCommands, { kind: P }>, "kind">,
    TEvents
  >;
};