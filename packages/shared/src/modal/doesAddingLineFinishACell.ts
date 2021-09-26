import { Line } from "./line";
import { MatchSettings } from "../match/match";
import { calculateTotalScore } from "./score";
import { computeCellStates } from "./computeCellStates";

interface Options {
  lines: Line[];
  newLine: Line;
  settings: MatchSettings;
}

export const doesAddingLineFinishACell = ({ lines, newLine, settings }: Options): boolean => {
  const scoreBefore = calculateTotalScore(computeCellStates({ lines, settings }));
  const scoreAfter = calculateTotalScore(computeCellStates({ lines, settings }));
  return scoreAfter > scoreBefore;
};
