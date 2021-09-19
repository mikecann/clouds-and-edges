import { narray, Point2D } from "@project/essentials";
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
