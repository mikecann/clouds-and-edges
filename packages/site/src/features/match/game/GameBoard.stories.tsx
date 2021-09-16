import * as React from "react";
import { Meta } from "@storybook/react";
import { GameBoard } from "./GameBoard";
import { produceCellStates, produceFilledLineState, producePlayerState } from "@project/shared";
import { produce } from "immer";

export default {
  title: "GameBoard",
  component: GameBoard,
} as Meta;

const playerA = producePlayerState({ id: `playerA`, color: "red" });
const playerB = producePlayerState({ id: `playerB`, color: "blue" });

const props: React.ComponentProps<typeof GameBoard> = {
  game: {
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
      draft.cells[1].lines.bottom = produceFilledLineState(playerA.id);
      draft.cells[0].lines.left = produceFilledLineState(playerB.id);
      draft.cells[2].lines.right = produceFilledLineState(playerB.id);
      draft.cells[7].lines.bottom = produceFilledLineState(playerA.id);
      draft.cells[3].owner = playerA.id;
      draft.cells[8].owner = playerB.id;
    })}
  />
);
