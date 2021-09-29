import { CreateMatchSize } from "./match";
import { Dot } from "../modal/dot";
import { LineDirection } from "../modal/line";
import { PlayerId } from "../modal/player";

interface Base {
  aggregate: `match`;
}

interface Create extends Base {
  kind: `create`;
  payload: {
    createdByUserId: string;
    size: CreateMatchSize;
  };
}

interface Cancel extends Base {
  kind: `cancel`;
  payload: {};
}

interface JoinRequest extends Base {
  kind: `join-request`;
  payload: {};
}

interface Join extends Base {
  kind: `join`;
  payload: {
    userId: string;
    name: string;
    avatar: string;
    color: string;
  };
}

interface Start extends Base {
  kind: `start`;
  payload: {
    firstPlayerToTakeATurn: PlayerId;
  };
}

interface TakeTurn extends Base {
  kind: `take-turn`;
  payload: {
    from: Dot;
    direction: LineDirection;
  };
}

export type MatchCommands = Create | Cancel | JoinRequest | Join | Start | TakeTurn;
