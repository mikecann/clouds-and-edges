import { ProcessEventHandlers } from "@project/workers-es";
import { Events } from "../../events";
import { ensure, getLogger } from "@project/essentials";
import { Commands, MatchSettings } from "@project/shared";

const logger = getLogger(`UsersProjection-handlers`);

type StoredProposal = {
  id: string;
  createdByUserId: string;
  settings: MatchSettings;
};

// NOTE TO SELF: this is now implemented, just need to make sure it works now!

export const proposalJoiningEventHandlers: ProcessEventHandlers<Events, Commands> = {
  handlers: {
    "proposal-created": async ({
      event: {
        aggregateId,
        payload: { createdByUserId, settings },
      },
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
      effects,
      storage,
    }) => {
      // Grab the already created proposal
      const proposal = ensure(await storage.get<StoredProposal>(`proposal:${aggregateId}`));

      // Lets matchmake it
      await effects.executeCommand({
        aggregate: "proposal",
        kind: "matchmake",
        payload: {},
      });

      // Then create the match
      await effects.executeCommand({
        aggregate: "match",
        kind: "create",
        payload: {
          players: [userId, proposal.createdByUserId],
          settings: proposal.settings,
        },
      });

      // Let the opponent know that a match has been created
      await effects.sendEmail(proposal.createdByUserId);
    },

    "proposal-cancelled": async ({ event: { aggregateId }, storage }) => {
      await storage.delete(`proposal:${aggregateId}`);
    },

    "proposal-creation-rejected": async ({ event: { aggregateId }, storage }) => {
      await storage.delete(`proposal:${aggregateId}`);
    },

    "proposal-matchmade": async ({ event: { aggregateId }, storage }) => {
      await storage.delete(`proposal:${aggregateId}`);
    },
  },

  effects: {
    sendEmail: (toUserId: string) => {
      // todo
    },
  },
};
