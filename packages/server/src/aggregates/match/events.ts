import { Point2D } from "@project/essentials";
import { LineDirection, MatchSettings, Player } from "@project/shared";

export interface MatchCreated {
  kind: "match-created";
  payload: {
    createdByUserId: string;
    settings: MatchSettings;
  };
}
export interface MatchJoinRequested {
  kind: "match-join-requested";
  payload: {
    userId: string;
  };
}

export interface MatchJoined {
  kind: "match-joined";
  payload: {
    player: Player;
  };
}

export interface MatchStarted {
  kind: "match-started";
  payload: {
    firstPlayerToTakeATurn: string;
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
    from: Point2D;
    direction: LineDirection;
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
  | MatchJoinRequested
  | MatchJoined
  | MatchStarted
  | MatchCancelled
  | MatchTurnTaken
  | MatchFinished;
