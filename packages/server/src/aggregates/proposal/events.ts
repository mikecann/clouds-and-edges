import { MatchSettings } from "@project/shared";

export interface ProposalCreated {
  kind: "proposal-created";
  payload: {
    settings: MatchSettings;
  };
}

export interface ProposalCreationRejected {
  kind: "proposal-creation-rejected";
  payload: {
    reason: string;
  };
}

export interface ProposalCancelled {
  kind: "proposal-cancelled";
  payload: {};
}

export interface ProposalJoined {
  kind: "proposal-joined";
  payload: {};
}

export type ProposalEvent =
  | ProposalCreated
  | ProposalCreationRejected
  | ProposalCancelled
  | ProposalJoined;
