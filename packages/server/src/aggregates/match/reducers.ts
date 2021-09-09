import { MatchAggregateState } from "./state";
import { AggregateReducers } from "@project/workers-es";
import { MatchEvent } from "./events";

export const reducers: AggregateReducers<MatchAggregateState, MatchEvent> = {
  "match-created": (state, { aggregateId, timestamp, payload: { settings, createdByUserId } }) => ({
    ...state,
    id: aggregateId,
    createdAt: timestamp,
    createdByUserId,
    settings,
  }),
  "match-cancelled": (state, { timestamp }) => ({
    ...state,
    cancelledAt: timestamp,
  }),
  "match-joined": (state, { payload: { userId } }) => ({
    opponentUserId: userId,
  }),
};
