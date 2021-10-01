import { Id } from "../modal/id";
import { MatchSettings } from "./match";
import { Line, LineDirection } from "../modal/line";
import { PlayerId, Player } from "../modal/player";
import { Dot } from "../modal/dot";

export type MatchStatus = "not-started" | "cancelled" | "playing" | "finished";

export interface PlayerTurn {
  line: Line;
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

export interface MatchesProjections {
  matches: {
    getOpen: {
      input: {
        excludePlayer?: PlayerId;
      };
      output: MatchProjection[];
    };
    getForPlayer: {
      input: { playerId: string };
      output: MatchProjection[];
    };
    getMatch: {
      input: {
        id: string;
      };
      output: MatchProjection;
    };
  };
}
