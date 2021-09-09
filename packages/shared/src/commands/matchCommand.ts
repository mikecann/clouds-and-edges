import { CreateMatchSize } from "../events/match";

interface Base {
  aggregate: `match`;
}

interface Create extends Base {
  kind: `create`;
  payload: {
    size: CreateMatchSize;
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
