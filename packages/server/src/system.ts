import { createSystem } from "@project/workers-es";
import { UserAggregate } from "./aggregates/user/UserAggregate";
import { ProposalAggregate } from "./aggregates/proposal/ProposalAggregate";
import { MatchAggregate } from "./aggregates/match/MatchAggregate";
import { UsersProjection } from "./projections/users/UsersProjection";
import { ProposalsProjection } from "./projections/proposals/ProposalsProjection";
import { ProposalJoiningProcess } from "./processes/proposalJoining/ProposalJoiningProcess";
import { EventStore } from "./EventStore";
import { MatchesProjection } from "./projections/matches/MatchesProjection";

export const system = createSystem({
  namespaces: {
    aggregates: {
      user: UserAggregate,
      proposal: ProposalAggregate,
      match: MatchAggregate,
    },

    projections: {
      users: UsersProjection,
      proposals: ProposalsProjection,
      matches: MatchesProjection,
    },

    processes: {
      proposalJoining: ProposalJoiningProcess,
    },

    events: EventStore,
  },
});
