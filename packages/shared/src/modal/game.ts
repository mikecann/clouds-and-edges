import { MatchSettings } from "../match/match";
import { PlayerState } from "./player";
import { CellState } from "./cell";

export interface GameState {
  settings: MatchSettings;
  cells: CellState[];
  players: PlayerState[];
}
