import {Event} from './events';

export type AggregateReducer<TState, TPayload> = (
  state: TState,
  context: { aggregateId: string; payload: TPayload }
) => TState;

export type AggregateReducers<
  TState = any,
  TEvents extends Event = Event
> = {
  [P in TEvents["kind"]]: AggregateReducer<
    TState,
    Omit<Extract<TEvents, { kind: P }>["payload"], "kind">
  >;
};
