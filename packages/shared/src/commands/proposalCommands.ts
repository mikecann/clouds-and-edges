import { MatchProposalSize } from "../modal/proposal";

interface Base {
  aggregate: `proposal`;
}

interface Create extends Base {
  kind: `create`;
  payload: {
    size: MatchProposalSize;
  };
}

interface Reject extends Base {
  kind: `reject-create`;
  payload: {
    reason: string;
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

interface Matchmake extends Base {
  kind: `matchmake`;
  payload: {};
}

export type ProposalCommand = Create | Reject | Cancel | Join | Matchmake;
