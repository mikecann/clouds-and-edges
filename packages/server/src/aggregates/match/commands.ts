import { AggregateCommandHandlers } from "@project/workers-es";
import { MatchAggregateState } from "./state";
import { createMatchSizeToDimensions, MatchCommand } from "@project/shared";
import { MatchEvent } from "./events";

/**
 * I think this would be better as a state machine using xstate
 */
export const commands: AggregateCommandHandlers<MatchAggregateState, MatchCommand, MatchEvent> = {
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
    if (state.cancelledAt) throw new Error(`cannot join match, match cancelled`);
    if (state.opponentUserId) throw new Error(`cannot join match, opponent already joined`);
    if (state.createdByUserId == userId) throw new Error(`cannot join match, you created it!`);

    return {
      kind: `match-joined`,
      payload: {
        userId,
      },
    };
  },
  cancel: (state, { payload: {}, userId, timestamp }) => {
    if (!state.createdAt) throw new Error(`cannot cancel, match not created`);
    if (state.cancelledAt) throw new Error(`cannot cancel, match already cancelled`);
    if (state.opponentUserId) throw new Error(`cannot cancel, someone already joined`);

    return {
      kind: `match-cancelled`,
      payload: {},
    };
  },
};
