import * as React from "react";
import { Meta } from "@storybook/react";
import { GameBoard } from "./GameBoard";
import { produceCellStates } from "@project/shared";

export default {
  title: "GameBoard",
  component: GameBoard,
} as Meta;

const props: React.ComponentProps<typeof GameBoard> = {
  game: {
    cells: produceCellStates({ width: 3, height: 3 }),
    players: [{ id: "playerA" }, { id: "playerB" }],
    settings: {
      gridSize: {
        width: 3,
        height: 3,
      },
    },
  },
};

export const Primary = () => <GameBoard {...props} />;
