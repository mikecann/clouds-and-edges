import { ProjectionEventHandlers } from "@project/workers-es";
import { Events } from "../../events";
import { MatchesProjectionRepo } from "./createMatchesProjectionRepo";
import {
  calculateWinner,
  computeCellStates,
  doesAddingLineFinishACell,
  Line,
} from "@project/shared";
import { ensure, iife } from "@project/essentials";

export const getHandlers = (repo: MatchesProjectionRepo): ProjectionEventHandlers<Events> => ({
  "match-created": async ({
    event: {
      aggregateId,
      payload: { createdByUserId, settings },
    },
  }) => {
    await repo.put({
      id: aggregateId,
      settings: settings,
      createdByUserId,
      lines: [],
      nextPlayerToTakeTurn: createdByUserId,
    });
  },

  "match-joined": async ({
    event: {
      aggregateId,
      payload: { userId },
    },
  }) => {
    await repo.update(aggregateId, (match) => ({
      ...match,
      joinedByUserId: userId,
    }));
  },

  // Todo: theres lots of duplication here with the aggregate
  "match-turn-taken": async ({ event: { aggregateId, payload } }) => {
    const state = await repo.get(aggregateId);

    const newLine: Line = {
      from: payload.from,
      direction: payload.direction,
      owner: payload.playerId,
    };

    const linesBefore = state.lines;
    const settings = ensure(state.settings);

    const nextPlayerToTakeTurn = iife(() => {
      if (doesAddingLineFinishACell({ newLine, lines: linesBefore, settings }))
        return state.nextPlayerToTakeTurn;

      // Return the alternate player
      return payload.playerId == state.createdByUserId
        ? ensure(state.joinedByUserId)
        : state.createdByUserId;
    });

    const newLines = [...linesBefore, newLine];

    const winner = calculateWinner(computeCellStates({ settings, lines: newLines }));
    console.log(`WINNER`, winner);

    await repo.put({
      ...state,
      lines: newLines,
      nextPlayerToTakeTurn,
      winner,
    });
  },

  "match-cancelled": async ({
    event: {
      aggregateId,
      payload: {},
    },
  }) => {
    await repo.remove(aggregateId);
  },
});
