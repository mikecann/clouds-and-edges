import { createSystem } from "@project/workers-es";

export const system = createSystem({
  namespaces: {
    aggregates: {
      user: `UserAggregate`,
      proposal: `ProposalAggregate`,
      match: `MatchAggregate`,
    },

    projections: {
      users: `UsersProjection`,
      proposals: `ProposalsProjection`,
    },

    processes: {
      proposalJoining: `ProposalJoiningProcess`,
    },

    events: `EventStore`,
  },
});
