import { Point2D } from "@project/essentials";
import { LineSide, MatchSettings } from "@project/shared";

export interface MatchCreated {
  kind: "match-created";
  payload: {
    createdByUserId: string;
    settings: MatchSettings;
  };
}

export interface MatchJoined {
  kind: "match-joined";
  payload: {
    userId: string;
  };
}

export interface MatchCancelled {
  kind: "match-cancelled";
  payload: {};
}

export interface MatchTurnTaken {
  kind: "match-turn-taken";
  payload: {
    playerId: string;
    cell: Point2D;
    line: LineSide;
  };
}

export interface MatchFinished {
  kind: "match-finished";
  payload: {
    winner: string;
  };
}

export type MatchEvent =
  | MatchCreated
  | MatchJoined
  | MatchCancelled
  | MatchTurnTaken
  | MatchFinished;
