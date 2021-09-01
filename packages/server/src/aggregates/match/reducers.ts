import { MatchAggregateState } from "./state";
import { AggregateReducers } from "@project/workers-es";
import { MatchEvent } from "./events";

export const reducers: AggregateReducers<MatchAggregateState, MatchEvent> = {
  "match-created": (state, { aggregateId, timestamp, payload: { settings, players } }) => ({
    ...state,
    id: aggregateId,
    createdAt: timestamp,
    players,
    settings,
  }),
};
