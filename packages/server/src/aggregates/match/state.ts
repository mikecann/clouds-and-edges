import { CellState, MatchSettings, PlayerId, PlayerState } from "@project/shared";

export interface MatchAggregateState {
  id?: string;
  createdAt?: number;
  cancelledAt?: number;
  createdByUserId?: string;
  opponentUserId?: string;
  settings?: MatchSettings;
  cells?: CellState[];
  nextPlayerToTakeTurn?: PlayerId;
  winner?: PlayerId;
}
