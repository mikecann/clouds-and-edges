import { calculateScores, calculateWinner } from "./score";
import { Point2D } from "@project/essentials";
import { CellState } from "./cell";
import { PlayerId } from "./player";

const produceCellState = (position: Point2D, owner?: PlayerId): CellState => ({
  position,
  owner,
});

describe("calculateScore", () => {
  it(`if no owners no score`, () => {
    const cell1 = produceCellState({ x: 0, y: 0 });
    expect(calculateScores([cell1])).toEqual({});
  });
  it(`if owner then scorer`, () => {
    const cell1 = produceCellState({ x: 0, y: 0 }, "dave");
    expect(calculateScores([cell1])).toEqual({ dave: 1 });
    const cell2 = produceCellState({ x: 1, y: 0 }, "dave");
    expect(calculateScores([cell1, cell2])).toEqual({ dave: 2 });
  });
  it(`if different owners then scores correctly`, () => {
    const cell1 = produceCellState({ x: 0, y: 0 }, "dave");
    const cell2 = produceCellState({ x: 1, y: 0 }, "bob");
    expect(calculateScores([cell1, cell2])).toEqual({ dave: 1, bob: 1 });
    const cell3 = produceCellState({ x: 2, y: 0 }, "dave");
    expect(calculateScores([cell1, cell2, cell3])).toEqual({ dave: 2, bob: 1 });
  });
});

describe("calculateWinner", () => {
  it(`when not finished there can be no winne`, () => {
    const cell1 = produceCellState({ x: 0, y: 0 });
    const cell2 = produceCellState({ x: 0, y: 0 }, "dave");
    expect(calculateWinner([cell1, cell2])).toEqual(undefined);
  });

  it(`returns winner if finished`, () => {
    const cell1 = produceCellState({ x: 0, y: 0 }, "dave");
    const cell2 = produceCellState({ x: 0, y: 0 }, "dave");
    expect(calculateWinner([cell1, cell2])).toEqual("dave");
  });

  it(`returns winner as the highest scoring player`, () => {
    const cell1 = produceCellState({ x: 0, y: 0 }, "bob");
    const cell2 = produceCellState({ x: 0, y: 0 }, "dave");
    const cell3 = produceCellState({ x: 0, y: 0 }, "bob");
    expect(calculateWinner([cell1, cell2, cell3])).toEqual("dave");
  });
});
