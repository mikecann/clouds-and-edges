import { ProjectionEventHandlers } from "@project/workers-es";
import { Events } from "../../events/events";
import { Db } from "./db";

export const getHandlers = (db: Db): ProjectionEventHandlers<Events> => ({
  "match-created": async ({ event: { aggregateId, payload, timestamp } }) => {
    await db.put("open", { id: aggregateId });
    await db.put("match", {
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
    await db.remove("open", aggregateId);
    await db.update("match", aggregateId, (match) => ({
      ...match,
      status: "cancelled",
    }));
  },

  "match-joined": async ({ event: { aggregateId, payload } }) => {
    await db.update("match", aggregateId, (match) => ({
      ...match,
      players: [...match.players, payload.player],
    }));

    const player = await db.find("player", payload.player.id);
    // Limit the player to 10 matches stored for performance
    const matches = [aggregateId, ...(player?.matches ?? [])].slice(0, 10);
    await db.put(`player`, { id: payload.player.id, matches });
  },

  "match-started": async ({ event: { aggregateId, payload } }) => {
    await db.remove("open", aggregateId);
    await db.update("match", aggregateId, (match) => ({
      ...match,
      status: "playing",
      nextPlayerToTakeTurn: payload.firstPlayerToTakeATurn,
    }));
  },

  "match-turn-taken": async ({ event: { aggregateId, payload, timestamp } }) => {
    await db.update("match", aggregateId, (match) => ({
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
    await db.update("match", aggregateId, (match) => ({
      ...match,
      status: "finished",
      winner: payload.winner,
    }));
  },
});
