import { MatchSettings } from "@project/shared";

export interface MatchCreated {
  kind: "match-created";
  payload: {
    players: [string, string];
    settings: MatchSettings;
  };
}

export type MatchEvent = MatchCreated;
