import { ensure, equals, narray, Point2D } from "@project/essentials";
import { Dimensions2d } from "../match/match";
import { PlayerId } from "./player";
import { Dot, getDotInDirection } from "./dot";
import { matchLiteral } from "variant";

export type CellPosition = Point2D;

export interface CellState {
  position: CellPosition;
  owner?: PlayerId;
}

export const produceCellStates = (
  dimensions: Dimensions2d = { width: 3, height: 3 }
): CellState[] =>
  narray(dimensions.height)
    .map((y) => narray(dimensions.width).map((x) => ({ position: { x, y } })))
    .flat();

export const isCellAt =
  (pos: CellPosition) =>
  (cell: CellState): boolean =>
    equals(cell.position, pos);

export const isCellOwnedBy =
  (player: PlayerId) =>
  (cell: CellState): boolean =>
    cell.owner == player;

export const findCellAt = (cells: CellState[], pos: CellPosition): CellState | undefined =>
  cells.find(isCellAt(pos));

export const getCellAt = (cells: CellState[], pos: CellPosition): CellState =>
  ensure(findCellAt(cells, pos));

export const getCell = (cells: CellState[], pos: CellPosition, owner: PlayerId): CellState =>
  ensure(cells.find((c) => isCellAt(pos)(c) && isCellOwnedBy(owner)(c)));

export const areAllCellsOwned = (cells: CellState[]): boolean =>
  cells.every((cell) => cell.owner != undefined);

export type CellCorner = "top-left" | "top-right" | "bottom-right" | "bottom-left";

export const getDotForCellCorner = ({ x, y }: CellPosition, corner: CellCorner): Dot =>
  matchLiteral(corner, {
    "top-left": () => ({ x, y }),
    "top-right": () => ({ x: x + 1, y }),
    "bottom-left": () => ({ x, y: y + 1 }),
    "bottom-right": () => ({ x: x + 1, y: y + 1 }),
  });

export const findCellCornerForDot = (dot: Dot, cellPos: CellPosition): CellCorner | undefined => {
  if (equals(dot, getDotForCellCorner(cellPos, "top-left"))) return "top-left";
  if (equals(dot, getDotForCellCorner(cellPos, "top-right"))) return "top-right";
  if (equals(dot, getDotForCellCorner(cellPos, "bottom-left"))) return "bottom-left";
  if (equals(dot, getDotForCellCorner(cellPos, "bottom-right"))) return "bottom-right";
  return undefined;
};
