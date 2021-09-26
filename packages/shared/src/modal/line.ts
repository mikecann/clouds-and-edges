import { Dot } from "./dot";
import { PlayerId } from "./player";
import { equals, Point2D } from "@project/essentials";
import { findCellCornerForDot } from "./cell";

export type LineDirection = "right" | "down";

export interface Line {
  from: Dot;
  direction: LineDirection;
  owner: PlayerId;
}

export const isLineAroundCell = (line: Line, cellPos: Point2D) => {
  const from = findCellCornerForDot(line.from, cellPos);

  if (from == "top-left") return true;
  if (from == "top-right" && line.direction == "down") return true;
  if (from == "bottom-left" && line.direction == "right") return true;

  return false;
};

export const getLinesAroundCell = (lines: Line[], cellPos: Point2D) =>
  lines.filter((l) => isLineAroundCell(l, cellPos));

export const findLineOwner = (
  lines: Line[],
  from: Dot,
  direction: LineDirection
): PlayerId | undefined =>
  lines.find((l) => equals(l.from, from) && l.direction == direction)?.owner;
