import { Dimensions2d, MatchSettings } from "./match";
import { ensure, equals, narray, Point2D } from "@project/essentials";

export interface FilledLine {
  kind: "filled";
  filledBy: PlayerId;
}

export interface EmptyLine {
  kind: "empty";
}

export type LineSide = keyof CellState["lines"];

export type LineState = FilledLine | EmptyLine;

export type PlayerId = string;

interface PlayerState {
  id: PlayerId;
  color: string;
  avatarEmoji: string;
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

export const producePlayerState = (options: { id: string; color?: string }): PlayerState => ({
  color: "red",
  avatarEmoji: ":)",
  ...options,
});

export const produceEmptyLineState = (): EmptyLine => ({ kind: "empty" });

export const produceFilledLineState = (filledBy: PlayerId): FilledLine => ({
  kind: "filled",
  filledBy,
});

export const produceCellState = (point2D: Point2D, overrides?: CellState): CellState => ({
  position: point2D,
  lines: {
    top: produceEmptyLineState(),
    right: produceEmptyLineState(),
    bottom: produceEmptyLineState(),
    left: produceEmptyLineState(),
  },
  ...overrides,
});

export const produceCellStates = (
  dimensions: Dimensions2d = { width: 3, height: 3 }
): CellState[] =>
  narray(dimensions.height)
    .map((y) => narray(dimensions.width).map((x) => produceCellState({ x, y })))
    .flat();
