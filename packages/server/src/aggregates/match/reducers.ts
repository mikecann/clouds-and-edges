import { MatchAggregateState } from "./state";
import { AggregateReducers } from "@project/workers-es";
import { MatchEvent } from "./events";
import { produceCellStates, updateCellsFromTurn, calculateWinner } from "@project/shared";

export const reducers: AggregateReducers<MatchAggregateState, MatchEvent> = {
  "match-created": (state, { aggregateId, timestamp, payload: { settings, createdByUserId } }) => ({
    ...state,
    id: aggregateId,
    createdAt: timestamp,
    createdByUserId,
    settings,
    cells: produceCellStates(settings.gridSize),
  }),
  "match-cancelled": (state, { timestamp }) => ({
    ...state,
    cancelledAt: timestamp,
  }),
  "match-joined": (state, { payload: { userId } }) => ({
    ...state,
    opponentUserId: userId,
  }),
  "match-turn-taken": (state, { payload }) => {
    const cells = updateCellsFromTurn(state.cells ?? [], payload);
    const winner = calculateWinner(cells);
    return {
      ...state,
      cells,
      winner,
    };
  },
  "match-finished": (state, { payload }) => state,
};
