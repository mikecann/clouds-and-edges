import { AggregateCommandHandlers } from "@project/workers-es";
import { MatchAggregateState } from "./state";
import {
  calculateWinner,
  computeCellStates,
  createMatchSizeToDimensions,
  MatchCommands,
} from "@project/shared";
import { MatchEvent } from "./events";
import { ensure, equals } from "@project/essentials";

/**
 * I think this would be better as a state machine using xstate
 */
export const commands: AggregateCommandHandlers<MatchAggregateState, MatchCommands, MatchEvent> = {
  create: ({ state, payload: { size }, userId, timestamp }) => {
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
  "join-request": ({ userId }) => {
    // todo: various checks against state
    return {
      kind: "match-join-requested",
      payload: {
        userId,
      },
    };
  },
  join: ({ state, payload: {}, userId, timestamp }) => {
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
  start: ({ userId, payload }) => {
    // todo: various checks against state
    return {
      kind: "match-started",
      payload: {
        firstPlayerToTakeATurn: payload.firstPlayerToTakeATurn,
      },
    };
  },
  cancel: ({ state, payload: {}, userId, timestamp }) => {
    if (!state.createdAt) throw new Error(`match not created`);
    if (state.cancelledAt) throw new Error(` match already cancelled`);
    if (state.opponentUserId) throw new Error(`someone already joined`);
    if (userId != state.createdByUserId) throw new Error(`you are not the owner`);

    return {
      kind: `match-cancelled`,
      payload: {},
    };
  },
  finish: ({ userId, payload }) => {
    // todo: various checks against state
    return {
      kind: "match-finished",
      payload: {
        winner: payload.winner,
      },
    };
  },
  "take-turn": ({ state, payload, userId, timestamp }) => {
    if (!state.createdAt) throw new Error(`match not created`);
    if (state.cancelledAt) throw new Error(`match cancelled`);
    if (!state.opponentUserId) throw new Error(`no opponent has joined yet`);
    if (userId != state.opponentUserId && userId != state.createdByUserId)
      throw new Error(`you are not a player in the match`);
    if (state.winner) throw new Error(`battle already finished`);

    if (state.nextPlayerToTakeTurn != userId) throw new Error(`not your turn`);

    const hasLine = (state.lines ?? []).some(
      (l) => equals(l.from, payload.from) && l.direction == payload.direction
    );
    if (hasLine) throw new Error(`line already filled`);

    const hasWinner = calculateWinner(
      computeCellStates({ settings: ensure(state.settings), lines: ensure(state.lines) })
    );
    if (hasWinner) {
      // todo: also dispatch a match-finished
    }

    return {
      kind: `match-turn-taken`,
      payload: {
        from: payload.from,
        direction: payload.direction,
        playerId: userId,
      },
    };
  },
};
