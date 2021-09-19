import { MatchSettings } from "../match/match";
import { ensure, equals, Point2D } from "@project/essentials";
import { PlayerState } from "./player";
import { CellState } from "./cell";

export interface GameState {
  settings: MatchSettings;
  cells: CellState[];
  players: PlayerState[];
}

export const getCellAt = (game: GameState, pos: Point2D): CellState =>
  ensure(game.cells.find((c) => equals(c.position, pos)));

export const getPlayer = (game: GameState, id: string): PlayerState =>
  ensure(game.players.find((p) => p.id == id));
