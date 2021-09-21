import { CellState, getCell, isCellFilled } from "./cell";
import { LineSide, produceFilledLineState } from "./line";
import { clone, Point2D } from "@project/essentials";

interface Payload {
  playerId: string;
  cell: Point2D;
  line: LineSide;
}

// todo: test this
export function updateCellsFromTurn(cells: CellState[], turn: Payload): CellState[] {
  // First we clone the cells because we are going to mutate
  cells = clone(cells);

  // Next lets update the cell
  const cell = getCell(cells, turn.cell, turn.playerId);
  cell.lines[turn.line] = produceFilledLineState(turn.playerId);

  // Now lets see if that cell is finished
  if (isCellFilled(cell)) cell.owner = turn.playerId;

  // We are now done
  return cells;
}
