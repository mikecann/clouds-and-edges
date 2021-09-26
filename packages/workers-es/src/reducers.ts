export type AggregateReducer<TState, TPayload> = (context: {
  state: TState;
  aggregateId: string;
  payload: TPayload;
  timestamp: number;
}) => TState;

export type AggregateReducers<
  TState = any,
  TEvents extends { kind: string; payload: unknown } = any
> = {
  [P in TEvents["kind"]]: AggregateReducer<
    TState,
    Omit<Extract<TEvents, { kind: P }>["payload"], "kind">
  >;
};
