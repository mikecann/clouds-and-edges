import * as React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { GameState, getCellAt, LineSide } from "@project/shared";
import { narray, Point2D } from "@project/essentials";
import { Cell, cellSize } from "./Cell";

interface Props {
  game: GameState;
  onTakeTurn: (cell: Point2D, line: LineSide) => unknown;
}

export const GameBoard: React.FC<Props> = ({ game, onTakeTurn }) => {
  const { settings, cells } = game;

  return (
    <Box>
      <SimpleGrid columns={3} width={`${settings.gridSize.width * cellSize.width}px`}>
        {narray(settings.gridSize.height)
          .map((y) =>
            narray(settings.gridSize.width).map((x) => (
              <Cell
                game={game}
                cell={getCellAt(game, { x, y })}
                onFillLine={(line) => onTakeTurn({ x, y }, line)}
              />
            ))
          )
          .flat()}
      </SimpleGrid>
    </Box>
  );
};
