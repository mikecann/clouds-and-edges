import { PlayerId } from "./player";
import { CellState } from "./cell";

export interface FilledLine {
  kind: "filled";
  filledBy: PlayerId;
}

export interface EmptyLine {
  kind: "empty";
}

export type LineSide = keyof CellState["lines"];

export type LineState = FilledLine | EmptyLine;

export const produceEmptyLineState = (): EmptyLine => ({ kind: "empty" });

export const produceFilledLineState = (filledBy: PlayerId): FilledLine => ({
  kind: "filled",
  filledBy,
});
