import * as React from "react";
import { Meta } from "@storybook/react";
import { GameBoard } from "./GameBoard";
import { produceCellStates, producePlayerState } from "@project/shared";
import { produce } from "immer";

export default {
  title: "GameBoard",
  component: GameBoard,
} as Meta;

const playerA = producePlayerState({ id: `playerA`, color: "red" });
const playerB = producePlayerState({ id: `playerB`, color: "blue" });

const props: React.ComponentProps<typeof GameBoard> = {
  game: {
    lines: [],
    cells: produceCellStates({ width: 3, height: 3 }),
    players: [playerA, playerB],
    settings: {
      gridSize: {
        width: 3,
        height: 3,
      },
    },
  },
  onTakeTurn: (cell, line) => alert(`onTakeTurn ${JSON.stringify({ cell, line })}`),
};

export const Primary = () => (
  <GameBoard
    {...props}
    game={produce(props.game, (draft) => {
      draft.lines.push({ from: { x: 0, y: 0 }, owner: playerA.id, direction: "right" });
      draft.lines.push({ from: { x: 1, y: 1 }, owner: playerB.id, direction: "down" });
      draft.lines.push({ from: { x: 2, y: 1 }, owner: playerA.id, direction: "right" });

      draft.lines.push({ from: { x: 2, y: 2 }, owner: playerB.id, direction: "right" });
      draft.lines.push({ from: { x: 2, y: 2 }, owner: playerB.id, direction: "down" });
      draft.lines.push({ from: { x: 3, y: 2 }, owner: playerB.id, direction: "down" });
      draft.lines.push({ from: { x: 2, y: 3 }, owner: playerA.id, direction: "right" });
      draft.cells[8].owner = playerB.id;
    })}
  />
);
