import { ensure, equals, narray, Point2D } from "@project/essentials";
import { Dimensions2d } from "../match/match";
import { PlayerId } from "./player";
import { LineState, produceEmptyLineState } from "./line";

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

export const isCellAt =
  (pos: Point2D) =>
  (cell: CellState): boolean =>
    equals(cell.position, pos);

export const isCellOwnedBy =
  (player: PlayerId) =>
  (cell: CellState): boolean =>
    cell.owner == player;

export const isCellFilled = (cell: CellState): boolean =>
  Object.values(cell.lines).every((c) => c.kind == "filled");

export const findCellAt = (cells: CellState[], pos: Point2D): CellState | undefined =>
  cells.find(isCellAt(pos));

export const getCellAt = (cells: CellState[], pos: Point2D): CellState =>
  ensure(findCellAt(cells, pos));

export const getCell = (cells: CellState[], pos: Point2D, owner: PlayerId): CellState =>
  ensure(cells.find((c) => isCellAt(pos)(c) && isCellOwnedBy(owner)(c)));

export const areAllCellsOwned = (cells: CellState[]): boolean =>
  cells.every((cell) => cell.owner != undefined);
