import { ProjectionEventHandlers } from "@project/workers-es";
import { Events } from "../../events";
import { getLogger } from "@project/essentials";
import { MatchesProjectionRepo } from "./createMatchesProjectionRepo";

const logger = getLogger(`UsersProjection-handlers`);

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
    await repo.update(aggregateId, {
      joinedByUserId: userId,
      status: "playing",
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
