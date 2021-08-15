export type AggregateReducer<TState, TPayload> = (
  state: TState,
  context: { aggregateId: string; payload: TPayload }
) => TState;

export type AggregateReducers<TState, TEvents extends { kind: string; payload: unknown }> = {
  [P in TEvents["kind"]]: AggregateReducer<
    TState,
    Omit<Extract<TEvents, { kind: P }>["payload"], "kind">
  >;
};
