import { Dimensions2d, MatchSettings } from "../events/match";
import { ensure, equals, narray, Point2D } from "@project/essentials";

export type LineState = `filled` | `empty`;

export type PlayerId = string;

interface PlayerState {
  id: PlayerId;
}

export interface CellState {
  position: Point2D;
  owner?: PlayerId;
  lines: {
    top: LineState;
    right: LineState;
    bottom: LineState;
    left: LineState;
  };
}

export interface GameState {
  settings: MatchSettings;
  cells: CellState[];
  players: PlayerState[];
}

export const getCellAt = (game: GameState, pos: Point2D): CellState =>
  ensure(game.cells.find((c) => equals(c.position, pos)));

export const getPlayer = (game: GameState, id: string): PlayerState =>
  ensure(game.players.find((p) => p.id == id));

const produceCellState = (point2D: Point2D, overrides?: CellState): CellState => ({
  position: point2D,
  lines: {
    top: "empty",
    right: "empty",
    bottom: "empty",
    left: "empty",
  },
  ...overrides,
});

export const produceCellStates = (
  dimensions: Dimensions2d = { width: 3, height: 3 }
): CellState[] =>
  narray(dimensions.height)
    .map((y) => narray(dimensions.width).map((x) => produceCellState({ x, y })))
    .flat();
