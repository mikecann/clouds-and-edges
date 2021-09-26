import { Id } from "../modal/id";
import { MatchSettings } from "./match";
import { LineDirection } from "../modal/line";
import { PlayerId, Player } from "../modal/player";
import { Dot } from "../modal/dot";

export type MatchStatus = "not-started" | "cancelled" | "playing" | "finished";

export interface PlayerTurn {
  from: Dot;
  player: PlayerId;
  direction: LineDirection;
  timestamp: number;
}

export interface MatchProjection {
  id: Id;
  settings: MatchSettings;
  createdAt: number;
  createdByUserId: PlayerId;
  nextPlayerToTakeTurn: PlayerId;
  turns: PlayerTurn[];
  players: Player[];
  status: MatchStatus;
  winner?: PlayerId;
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
