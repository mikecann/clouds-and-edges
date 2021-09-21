import { CellState } from "./cell";
import { PlayerId } from "./player";

export type Score = number;

export type Scores = Record<PlayerId, number>;

// todo: test this
export const calculateScore = (cells: CellState[]): Scores =>
  cells.reduce(
    (accum, curr) => ({
      ...accum,
      [curr.owner ?? ""]: (accum[curr.owner ?? ""] ?? 0) + 1,
    }),
    {} as Scores
  );

// todo: test this
export const calculateWinner = (cells: CellState[]): PlayerId | undefined => {
  const scores = Object.entries(calculateScore(cells)).sort(([, a], [, b]) => a - b);
  const first = scores[0];
  if (!first) return undefined;
  return first[0];
};
