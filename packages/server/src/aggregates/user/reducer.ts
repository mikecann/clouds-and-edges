import { UserAggregateState } from "./state";

type EventKind = string;
type EventPayload = unknown;

type AggregateReducer<TState, TPayload> = (
  state: TState,
  context: { aggregateId: string; payload: TPayload }
) => TState;

interface Reducers {
  "user-created": AggregateReducer<UserAggregateState, { name: string }>;
}

export const reducers: Reducers = {
  "user-created": (state, { aggregateId, payload: { name } }) => ({
    id: aggregateId,
    createdAt: Date.now(),
    name,
  }),
};
