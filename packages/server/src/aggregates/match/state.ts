import { CellState, GameState, MatchSettings } from "@project/shared";
import { MatchFinished } from "./events";

export interface MatchAggregateState {
  id?: string;
  createdAt?: number;
  cancelledAt?: number;
  createdByUserId?: string;
  opponentUserId?: string;
  settings?: MatchSettings;
  winnderId?: string;
}
