import { computeCellStates } from "./computeCellStates";
import { MatchSettings } from "../match/match";
import { Line } from "./line";

const settings: MatchSettings = {
  maxPlayers: 2,
  gridSize: {
    width: 3,
    height: 3,
  },
};

it(`works`, () => {
  const lines: Line[] = [
    { owner: "a", direction: "right", from: { x: 1, y: 1 } },
    { owner: "b", direction: "down", from: { x: 2, y: 1 } },
    { owner: "c", direction: "right", from: { x: 1, y: 1 } },
    { owner: "d", direction: "right", from: { x: 2, y: 2 } },
    { owner: "e", direction: "down", from: { x: 1, y: 1 } },
  ];

  const cells = computeCellStates({ settings, lines });

  expect(cells.map((c) => c.owner)).toEqual([
    undefined,
    undefined,
    undefined,
    undefined,
    "e",
    undefined,
    undefined,
    undefined,
    undefined,
  ]);
});
