import { MatchSettings } from "@project/shared";

interface Base {
  aggregate: `match`;
}

interface Create extends Base {
  kind: `create`;
  payload: {
    settings: MatchSettings;
  };
}

interface Cancel extends Base {
  kind: `cancel`;
  payload: {};
}

interface Join extends Base {
  kind: `join`;
  payload: {};
}

export type MatchCommand = Create | Cancel | Join;
