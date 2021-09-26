import { matchLiteral } from "variant";

export interface Dimensions2d {
  width: number;
  height: number;
}

export interface MatchSettings {
  gridSize: Dimensions2d;
  maxPlayers: 2;
}

export type CreateMatchSize = "small" | "medium" | "large";

export const createMatchSizeToDimensions = (size: CreateMatchSize): Dimensions2d =>
  matchLiteral(size, {
    small: () => ({ width: 3, height: 3 }),
    medium: () => ({ width: 5, height: 5 }),
    large: () => ({ width: 7, height: 7 }),
  });
