export interface Point2D {
  x: number;
  y: number;
}

export const equals = (p1: Point2D, p2: Point2D): boolean => p1.x === p2.x && p1.y === p2.y;
