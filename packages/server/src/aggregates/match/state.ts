import { MatchSettings } from "@project/shared";

export interface MatchAggregateState {
  id?: string;
  createdAt?: number;
  cancelledAt?: number;
  createdByUserId?: string;
  opponentUserId?: string;
  settings?: MatchSettings;
}
