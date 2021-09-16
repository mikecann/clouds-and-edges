import { MatchSettings } from "src/modal/match";
import { Id } from "../modal/id";

export interface UserProjection {
  id: Id;
  name: string;
}

export interface MatchProjection {
  id: Id;
  settings: MatchSettings;
  createdByUserId: string;
  joinedByUserId?: string;
  status: "not-started" | "playing" | "finished";
  winnerId?: string;
}

export interface OpenMatchProjection {
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
  matches: {
    getMatches: {
      input: {
        userId: string;
      };
      output: MatchProjection[];
    };
  };
  openMatches: {
    getOpenMatches: {
      input: {};
      output: OpenMatchProjection[];
    };
  };
};

export type ProjectionKinds = keyof Projections;
