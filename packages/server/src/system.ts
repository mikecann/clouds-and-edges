import { createSystem } from "@project/workers-es";
import { UserAggregate } from "./aggregates/user/UserAggregate";
import { MatchAggregate } from "./aggregates/match/MatchAggregate";
import { UsersProjection } from "./projections/users/UsersProjection";
import { EventStore } from "./EventStore";
import { MatchesProjection } from "./projections/matches/MatchesProjection";
import { OpenMatchesProjection } from "./projections/openMatches/OpenMatchesProjection";
import { MatchJoiningProcess } from "./processes/matchJoining/MatchJoiningProcess";

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
      matchJoining: MatchJoiningProcess,
    },

    events: EventStore,
  },
});
