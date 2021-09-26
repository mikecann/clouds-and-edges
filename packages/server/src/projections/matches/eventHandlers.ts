import { ProjectionEventHandlers } from "@project/workers-es";
import { Events } from "../../events";
import { MatchesProjectionRepo } from "./createMatchesProjectionRepo";

export const getHandlers = (repo: MatchesProjectionRepo): ProjectionEventHandlers<Events> => ({
  "match-created": async ({ event: { aggregateId, payload, timestamp } }) => {
    await repo.put({
      id: aggregateId,
      settings: payload.settings,
      createdByUserId: payload.createdByUserId,
      createdAt: timestamp,
      players: [],
      status: "not-started",
      turns: [],
      nextPlayerToTakeTurn: payload.createdByUserId,
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

  "match-joined": async ({ event: { aggregateId, payload } }) => {
    await repo.update(aggregateId, (match) => ({
      ...match,
      players: [...match.players, payload.player],
    }));
  },

  "match-started": async ({ event: { aggregateId, payload } }) => {
    await repo.update(aggregateId, (match) => ({
      ...match,
      status: "playing",
      nextPlayerToTakeTurn: payload.firstPlayerToTakeATurn,
    }));
  },

  "match-turn-taken": async ({ event: { aggregateId, payload, timestamp } }) => {
    await repo.update(aggregateId, (match) => ({
      ...match,
      status: "playing",
      nextPlayerToTakeTurn: payload.nextPlayerToTakeTurn,
      turns: [
        ...match.turns,
        {
          line: payload.line,
          timestamp,
        },
      ],
    }));
  },

  "match-finished": async ({ event: { aggregateId, payload } }) => {
    await repo.update(aggregateId, (match) => ({
      ...match,
      status: "finished",
      winner: payload.winner,
    }));
  },
});
