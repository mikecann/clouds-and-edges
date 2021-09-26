import { UserAggregateState } from "./state";
import { AggregateReducers } from "@project/workers-es";
import { UserEvent } from "./events";

export const reducers: AggregateReducers<UserAggregateState, UserEvent> = {
  "user-created": ({ state, aggregateId, timestamp, payload }) => ({
    ...state,
    id: aggregateId,
    createdAt: timestamp,
    name: payload.name,
  }),
  "user-name-set": ({ state }) => ({
    ...state,
    name: state.name,
  }),
  "user-create-match-requested": ({ state }) => state,
};
