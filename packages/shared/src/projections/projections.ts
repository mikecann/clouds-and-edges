import { Id } from "../modal/id";
import { MatchSettings } from "../events/match";

export interface UserProjection {
  id: Id;
  name: string;
}

export interface ProposalProjection {
  id: Id;
  settings: MatchSettings;
  createdByUserId: string;
}

export type Projections = {
  users: {
    findUserById: {
      input: {
        id: string;
      };
      output: {
        user?: UserProjection | null;
      };
    };
  };
  proposals: {
    getProposals: {
      input: {
        userId: string;
      };
      output: {
        proposals: ProposalProjection[];
      };
    };
  };
};

export type ProjectionKinds = keyof Projections;
