import { UserAggregateState } from "./state";
import { AggregateReducers } from "@project/workers-es";
import { UserEvent } from "./events";

export const reducers: AggregateReducers<UserAggregateState, UserEvent> = {
  "user-created": (state, { aggregateId, timestamp, payload: { name } }) => ({
    id: aggregateId,
    createdAt: timestamp,
    name,
  }),
  "user-name-set": (state, { aggregateId, payload: { name } }) => ({
    ...state,
    name,
  }),
};
