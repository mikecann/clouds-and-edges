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
  }),
  "match-finished": ({ state, payload }) => ({
    ...state,
    status: "finished",
  }),
  // "match-turn-taken": ({ state, payload }) => {
  //   const newLine: Line = {
  //     from: payload.from,
  //     direction: payload.direction,
  //     owner: payload.playerId,
  //   };
  //
  //   const linesBefore = state.lines ?? [];
  //   const settings = ensure(state.settings);
  //
  //   const nextPlayerToTakeTurn = iife(() => {
  //     if (doesAddingLineFinishACell({ newLine, lines: linesBefore, settings }))
  //       return state.nextPlayerToTakeTurn;
  //
  //     // Return the alternate player
  //     return payload.playerId == state.createdByUserId
  //       ? state.opponentUserId
  //       : state.createdByUserId;
  //   });
  //
  //   const newLines = [...linesBefore, newLine];
  //
  //   return {
  //     ...state,
  //     lines: newLines,
  //     winner: calculateWinner(computeCellStates({ settings, lines: newLines })),
  //     nextPlayerToTakeTurn,
  //   };
  // },
};
