import { ProjectionEventHandlers } from "@project/workers-es";
import { Events } from "../../events";
import { ensure, getLogger } from "@project/essentials";
import { ProposalProjection } from "@project/shared";

const logger = getLogger(`UsersProjection-handlers`);

export const getHandlers = (storage: DurableObjectStorage): ProjectionEventHandlers<Events> => ({
  "proposal-created": async ({
    event: {
      aggregateId,
      payload: { createdByUserId, settings },
    },
  }) => {
    logger.debug(`ProposalsProjection user-created`);

    await storage.put<ProposalProjection>(`proposal:${aggregateId}`, {
      id: aggregateId,
      settings: settings,
      createdByUserId,
    });

    const userProposals = await storage.get<string[] | undefined>(`user:${createdByUserId}`);

    await storage.put<string[]>(
      `user:${createdByUserId}`,
      userProposals ? [...userProposals, aggregateId] : [aggregateId]
    );

    logger.debug(`ProposalsProjection stored`);
  },
  "proposal-cancelled": async ({ event: { aggregateId } }) => {
    const proposal = ensure(await storage.get<ProposalProjection>(`proposal:${aggregateId}`));
    await storage.delete(`proposal:${aggregateId}`);

    const userProposals = await storage.get<string[] | undefined>(
      `user:${proposal.createdByUserId}`
    );

    if (userProposals) {
      const newReferences = userProposals.filter((p) => p != aggregateId);
      if (newReferences.length > 0)
        await storage.put(`user:${proposal.createdByUserId}`, newReferences);
      else await storage.delete(`user:${proposal.createdByUserId}`);
    }
  },
  "proposal-joined": async ({ event: { aggregateId } }) => {
    const proposal = ensure(await storage.get<ProposalProjection>(`proposal:${aggregateId}`));
    await storage.delete(`proposal:${aggregateId}`);

    const userProposals = await storage.get<string[] | undefined>(
      `user:${proposal.createdByUserId}`
    );

    if (userProposals) {
      const newReferences = userProposals.filter((p) => p != aggregateId);
      if (newReferences.length > 0)
        await storage.put(`user:${proposal.createdByUserId}`, newReferences);
      else await storage.delete(`user:${proposal.createdByUserId}`);
    }
  },
});
