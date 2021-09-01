import { MatchSettings } from "@project/shared";

interface Create {
  kind: `create`;
  aggregate: `match`;
  payload: {
    players: [string, string];
    settings: MatchSettings;
  };
}

export type MatchCommand = Create;
