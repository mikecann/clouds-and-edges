import { ProjectionEventHandlers } from "@project/workers-es";
import { Events } from "../../events";
import { MatchesProjectionRepo } from "./createMatchesProjectionRepo";
import {
  getCellAt,
  produceCellStates,
  produceFilledLineState,
  producePlayerState,
} from "@project/shared";
import { produce } from "immer";
import { ensure } from "@project/essentials";

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
      status: "not-started",
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
      status: "playing",

      // We now have two players so can create the game state
      game: {
        settings: match.settings,
        players: [
          producePlayerState({
            id: match.createdByUserId,
            color: "red",
          }),
          producePlayerState({
            id: userId,
            color: "blue",
          }),
        ],
        cells: produceCellStates(match.settings.gridSize),
      },
    }));
  },

  "match-turn-taken": async ({
    event: {
      aggregateId,
      payload: { line, cell, playerId },
    },
  }) => {
    await repo.update(aggregateId, (match) => {
      const game = ensure(match.game);

      // produce(ensure(match.game), (draft) => {
      //   getCellAt(draft, cell).lines[line] = produceFilledLineState(playerId);
      // }),

      // For now just locally mutating the game because immer doesnt play nice with Workers :(
      getCellAt(game.cells, cell).lines[line] = produceFilledLineState(playerId);

      return {
        ...match,
        game,
      };
    });
  },

  "match-finished": async ({
    event: {
      aggregateId,
      payload: { winner },
    },
  }) => {
    await repo.update(aggregateId, (match) => ({
      ...match,
      status: "finished",
      winnerId: winner,
    }));
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
