import { Point2D } from "@project/essentials";
import { CreateMatchSize } from "../modal/match";
import { LineSide } from "../modal/game";

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

interface TakeTurn extends Base {
  kind: `take-turn`;
  payload: {
    cell: Point2D;
    line: LineSide;
  };
}

export type MatchCommand = Create | Cancel | Join | TakeTurn;
