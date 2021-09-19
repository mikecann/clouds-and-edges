import { Id } from "../modal/id";
import { MatchSettings } from "./match";
import { GameState } from "../modal/game";

export interface MatchProjection {
  id: Id;
  settings: MatchSettings;
  createdByUserId: string;
  joinedByUserId?: string;
  status: "not-started" | "playing" | "finished";
  winnerId?: string;
  game?: GameState;
}

export interface OpenMatchProjection {
  id: Id;
  settings: MatchSettings;
  createdByUserId: string;
}

export interface MatchesProjections {
  matches: {
    getMatches: {
      input: {
        userId: string;
      };
      output: MatchProjection[];
    };
    getMatch: {
      input: {
        id: string;
      };
      output: MatchProjection;
    };
  };
  openMatches: {
    getOpenMatches: {
      input: {};
      output: OpenMatchProjection[];
    };
  };
}
