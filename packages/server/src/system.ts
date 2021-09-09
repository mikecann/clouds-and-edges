import { createSystem } from "@project/workers-es";
import { UserAggregate } from "./aggregates/user/UserAggregate";
import { MatchAggregate } from "./aggregates/match/MatchAggregate";
import { UsersProjection } from "./projections/users/UsersProjection";
import { ProposalJoiningProcess } from "./processes/proposalJoining/ProposalJoiningProcess";
import { EventStore } from "./EventStore";
import { MatchesProjection } from "./projections/matches/MatchesProjection";
import { OpenMatchesProjection } from "./projections/openMatches/OpenMatchesProjection";

export const system = createSystem({
  namespaces: {
    aggregates: {
      user: UserAggregate,
      match: MatchAggregate,
    },

    projections: {
      users: UsersProjection,
      matches: MatchesProjection,
      openMatches: OpenMatchesProjection,
    },

    processes: {
      proposalJoining: ProposalJoiningProcess,
    },

    events: EventStore,
  },
});
