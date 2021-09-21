import { AggregateCommandHandlers } from "@project/workers-es";
import { MatchAggregateState } from "./state";
import { createMatchSizeToDimensions, getCell, MatchCommands } from "@project/shared";
import { MatchEvent } from "./events";

/**
 * I think this would be better as a state machine using xstate
 */
export const commands: AggregateCommandHandlers<MatchAggregateState, MatchCommands, MatchEvent> = {
  create: (state, { payload: { size }, userId, timestamp }) => {
    if (state.createdAt) throw new Error(`match already created`);

    return {
      kind: `match-created`,
      payload: {
        createdByUserId: userId,
        settings: {
          gridSize: createMatchSizeToDimensions(size),
        },
      },
    };
  },
  join: (state, { payload: {}, userId, timestamp }) => {
    if (state.cancelledAt) throw new Error(`match cancelled`);
    if (state.opponentUserId) throw new Error(`opponent already joined`);
    if (state.createdByUserId == userId) throw new Error(`you created it!`);

    return {
      kind: `match-joined`,
      payload: {
        userId,
      },
    };
  },
  cancel: (state, { payload: {}, userId, timestamp }) => {
    if (!state.createdAt) throw new Error(`match not created`);
    if (state.cancelledAt) throw new Error(` match already cancelled`);
    if (state.opponentUserId) throw new Error(`someone already joined`);
    if (userId != state.createdByUserId) throw new Error(`you are not the owner`);

    return {
      kind: `match-cancelled`,
      payload: {},
    };
  },
  "take-turn": (state, { payload, userId, timestamp }) => {
    if (!state.createdAt) throw new Error(`cannot take turn, match not created`);
    if (state.cancelledAt) throw new Error(`cannot take turn, match cancelled`);
    if (!state.opponentUserId) throw new Error(`cannot take turn, no opponent has joined yet`);
    if (userId != state.opponentUserId && userId != state.createdByUserId)
      throw new Error(`cannot take turn when you are not a player in the match`);

    if (state.nextPlayerToTakeTurn != userId) throw new Error(`not your turn`);

    const cell = getCell(state.cells ?? [], payload.cell, userId);
    const line = cell.lines[payload.line];

    if (line.kind == "filled") throw new Error(`line already filled`);

    return {
      kind: `match-turn-taken`,
      payload: {
        cell,
        line,
        playerId: userId,
      },
    };
  },
};
