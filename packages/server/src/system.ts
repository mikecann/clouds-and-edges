import { createSystem } from "@project/workers-es";
import { UserAggregate } from "./aggregates/user/UserAggregate";
import { MatchAggregate } from "./aggregates/match/MatchAggregate";
import { UsersProjection } from "./projections/users/UsersProjection";
import { EventStore } from "./events/EventStore";
import { MatchesProjection } from "./projections/matches/MatchesProjection";
import { MatchJoiningProcess } from "./processes/matchJoining/MatchJoiningProcess";
import { MatchCreationProcess } from "./processes/matchCreation/MatchCreationProcess";

export const system = createSystem({
  namespaces: {
    aggregates: {
      user: UserAggregate,
      match: MatchAggregate,
    },

    projections: {
      users: UsersProjection,
      matches: MatchesProjection,
    },

    processes: {
      matchJoining: MatchJoiningProcess,
      matchCreation: MatchCreationProcess,
    },

    events: EventStore,
  },
});
