import { ProjectionEventHandlers } from "@project/workers-es";
import { Events } from "../../events";
import { getLogger } from "@project/essentials";
import { OpenMatchesProjectionRepo } from "./createOpenMatchesProjection";

const logger = getLogger(`UsersProjection-handlers`);

export const getHandlers = (repo: OpenMatchesProjectionRepo): ProjectionEventHandlers<Events> => ({
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
    });
  },

  "match-joined": async ({
    event: {
      aggregateId,
      payload: { userId },
    },
  }) => {
    await repo.remove(aggregateId);
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
