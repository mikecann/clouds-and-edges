import { Point2D } from "@project/essentials";
import { CreateMatchSize } from "./match";
import { LineSide } from "../modal/line";

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

interface Finish extends Base {
  kind: `finish`;
  payload: {
    winner: string;
  };
}

export type MatchCommands = Create | Cancel | Join | TakeTurn | Finish;
