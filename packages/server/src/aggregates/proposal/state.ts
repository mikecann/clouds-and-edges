import { MatchSettings } from "@project/shared";

export interface ProposalAggregateState {
  id?: string;
  createdAt?: number;
  cancelledAt?: number;
  joinedAt?: number;
  rejectedAt?: number;
  createdByUserId?: string;
  settings?: MatchSettings;
}
