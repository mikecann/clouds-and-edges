import { Point2D, Direction } from "@project/essentials";
import { matchLiteral } from "variant";

export type Dot = Point2D;

export const getDotInDirection = ({ x, y }: Dot, direction: Direction): Dot =>
  matchLiteral(direction, {
    up: () => ({ x, y: y - 1 }),
    down: () => ({ x, y: y + 1 }),
    left: () => ({ x: x - 1, y }),
    right: () => ({ x: x + 1, y }),
  });
