import { MatchSettings } from "@project/shared";

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

export type MatchEvent = MatchCreated | MatchJoined | MatchCancelled;
