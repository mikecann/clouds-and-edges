import { MatchSettings } from "@project/shared";

export interface MatchAggregateState {
  id?: string;
  createdAt?: number;
  players?: [string, string];
  settings?: MatchSettings;
}
