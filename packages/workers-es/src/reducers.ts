export type AggregateReducer<TState = unknown, TPayload = unknown> = (context: {
  state: TState;
  aggregateId: string;
  payload: TPayload;
  timestamp: number;
}) => TState;

type Kindable = { kind: string; payload: unknown };

export type AggregateReducers<
  TState = unknown,
  TEvents extends Kindable = Kindable
> = {
  [P in TEvents["kind"]]: AggregateReducer<
    TState,
    Omit<Extract<TEvents, { kind: P }>["payload"], "kind">
  >;
};
