import { MatchAggregateState } from "./state";
import { AggregateReducers } from "@project/workers-es";
import { MatchEvent } from "./events";

export const reducers: AggregateReducers<MatchAggregateState, MatchEvent> = {
  "match-created": ({ state, aggregateId, timestamp, payload }) => ({
    ...state,
    id: aggregateId,
    createdAt: timestamp,
    createdByUserId: payload.createdByUserId,
    settings: payload.settings,
    status: "not-started",
    players: [],
    lines: [],
  }),
  "match-cancelled": ({ state, timestamp }) => ({
    ...state,
    cancelledAt: timestamp,
    status: "cancelled",
  }),
  "match-join-requested": ({ state, payload }) => ({
    ...state,
  }),
  "match-joined": ({ state, payload }) => ({
    ...state,
    players: [...state.players, payload.player],
  }),
  "match-started": ({ state, payload }) => ({
    ...state,
    status: "playing",
    lines: [],
  }),
  "match-turn-taken": ({ state, payload }) => ({
    ...state,
    nextPlayerToTakeTurn: payload.nextPlayerToTakeTurn,
    lines: [...state.lines, payload.line],
  }),
  "match-finished": ({ state, payload }) => ({
    ...state,
    status: "finished",
  }),
};
