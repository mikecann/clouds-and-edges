import { areAllCellsOwned, CellState } from "./cell";
import { PlayerId } from "./player";

export type Score = number;

export type Scores = Record<PlayerId, number>;

export const calculateScores = (cells: CellState[]): Scores => {
  const scores: Scores = {};
  for (let cell of cells) {
    if (!cell.owner) continue;
    const score = scores[cell.owner] ?? 0;
    scores[cell.owner] = score + 1;
  }
  return scores;
};

export const calculateTotalScore = (cells: CellState[]): number =>
  Object.values(calculateScores(cells)).reduce((accum, curr) => accum + curr, 0);

export const calculateWinner = (cells: CellState[]): PlayerId | undefined => {
  debugger;
  if (!areAllCellsOwned(cells)) return undefined;
  const scores = Object.entries(calculateScores(cells)).sort(([, a], [, b]) => b - a);
  const first = scores[0];
  if (!first) return undefined;
  return first[0];
};
