import { MatchSettings } from "../match/match";
import { getLinesAroundCell, Line } from "./line";
import { CellState, produceCellStates } from "./cell";

interface Options {
  settings: MatchSettings;
  lines: Line[];
}

export const computeCellStates = ({ settings, lines }: Options): CellState[] => {
  const cells = produceCellStates(settings.gridSize);

  for (const cell of cells) {
    const cellLines = getLinesAroundCell(lines, cell.position);
    if (cellLines.length == 4) cell.owner = cellLines[3].owner;
  }

  return cells;
};
