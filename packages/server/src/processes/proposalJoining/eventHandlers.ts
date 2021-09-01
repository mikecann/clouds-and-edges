import { ProcessEventHandlers, ProjectionEventHandlers } from "@project/workers-es";
import { Events } from "../../events";
import { ensure, getLogger } from "@project/essentials";
import { Commands, MatchSettings } from "@project/shared";

const logger = getLogger(`UsersProjection-handlers`);

type StoredProposal = {
  id: string;
  createdByUserId: string;
  settings: MatchSettings;
};

export const proposalJoiningEventHandlers: ProcessEventHandlers<Events, Commands> = {
  handlers: {
    "proposal-created": async ({
      event: {
        aggregateId,
        payload: { createdByUserId, settings },
      },
      sideEffects,
      storage,
    }) => {
      await storage.put<StoredProposal>(`proposal:${aggregateId}`, {
        id: aggregateId,
        settings: settings,
        createdByUserId,
      });
    },

    "proposal-joined": async ({
      event: {
        aggregateId,
        payload: { userId },
      },
      sideEffects,
      storage,
    }) => {
      // Grab the already created proposal
      const proposal = ensure(await storage.get<StoredProposal>(`proposal:${aggregateId}`));

      // Lets matchmake it
      await sideEffects.executeCommand({
        aggregate: "proposal",
        kind: "matchmake",
        payload: {},
      });

      // Then create the match
      await sideEffects.executeCommand({
        aggregate: "match",
        kind: "create",
        payload: {
          players: [userId, proposal.createdByUserId],
          settings: proposal.settings,
        },
      });

      // Now we can remove it from our cache as we no longer need it
      await storage.delete(`proposal:${aggregateId}`);
    },

    "proposal-cancelled": async ({
      event: {
        aggregateId,
        payload: {},
      },
      sideEffects,
      storage,
    }) => {
      await storage.delete(`proposal:${aggregateId}`);
    },
  },

  sideEffects: {},
};
