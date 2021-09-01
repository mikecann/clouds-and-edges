import { MatchSettings } from "@project/shared";

export interface ProposalCreated {
  kind: "proposal-created";
  payload: {
    createdByUserId: string;
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
  payload: {
    userId: string;
  };
}

export interface ProposalMatchmade {
  kind: "proposal-matchmade";
  payload: {};
}

export type ProposalEvent =
  | ProposalCreated
  | ProposalCreationRejected
  | ProposalCancelled
  | ProposalJoined
  | ProposalMatchmade;
