import { Line, MatchSettings, PlayerId, Player, MatchStatus } from "@project/shared";

export interface MatchAggregateState {
  id?: string;
  createdAt?: number;
  cancelledAt?: number;
  createdByUserId?: string;
  players: Player[];
  settings?: MatchSettings;
  lines: Line[];
  status: MatchStatus;
  nextPlayerToTakeTurn?: PlayerId;
  winner?: PlayerId;
}
