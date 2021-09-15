import * as React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { GameState, getCellAt } from "@project/shared";
import { narray } from "@project/essentials";
import { Cell, cellSize } from "./Cell";

interface Props {
  game: GameState;
}

export const GameBoard: React.FC<Props> = ({ game }) => {
  const { settings, cells } = game;

  return (
    <Box>
      <SimpleGrid columns={3} width={`${settings.gridSize.width * cellSize.width}px`}>
        {narray(settings.gridSize.height)
          .map((y) =>
            narray(settings.gridSize.width).map((x) => (
              <Cell game={game} cell={getCellAt(game, { x, y })} />
            ))
          )
          .flat()}
      </SimpleGrid>
    </Box>
  );
};
