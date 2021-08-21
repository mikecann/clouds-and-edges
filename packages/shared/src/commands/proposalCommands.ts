import { MatchSettings } from "../events/match";

interface Create {
  kind: `create`;
  aggregate: `proposal`;
  payload: {
    settings: MatchSettings;
  };
}

interface Reject {
  kind: `reject-create`;
  aggregate: `proposal`;
  payload: {
    reason: string;
  };
}

interface Cancel {
  kind: `cancel`;
  aggregate: `proposal`;
  payload: {
    proposalId: string;
  };
}

interface Join {
  kind: `join`;
  aggregate: `proposal`;
  payload: {
    proposalId: string;
  };
}

export type ProposalCommand = Create | Reject | Cancel | Join;
