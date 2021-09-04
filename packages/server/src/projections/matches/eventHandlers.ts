import { ProjectionEventHandlers } from "@project/workers-es";
import { Events } from "../../events";
import { ensure, getLogger } from "@project/essentials";
import { MatchProjection, ProposalProjection } from "@project/shared";

const logger = getLogger(`UsersProjection-handlers`);

export const getHandlers = (storage: DurableObjectStorage): ProjectionEventHandlers<Events> => ({
  "match-created": async ({
    event: {
      aggregateId,
      payload: { players, settings },
    },
  }) => {
    logger.debug(`MatchProjection match-created`);

    await storage.put<MatchProjection>(`match:${aggregateId}`, {
      id: aggregateId,
      settings: settings,
      players,
    });

    // const userMatches = await storage.get<string[] | undefined>(`user:${createdByUserId}`);
    //
    // await storage.put<string[]>(
    //   `user:${createdByUserId}`,
    //   userProposals ? [...userProposals, aggregateId] : [aggregateId]
    // );

    logger.debug(`MatchProjection stored`);
  },
});
