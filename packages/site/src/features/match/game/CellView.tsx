import * as React from "react";
import { Box, BoxProps, Center } from "@chakra-ui/react";
import { CellState, Dimensions2d, getPlayer, LineDirection } from "@project/shared";
import { GameState } from "./GameState";

interface Props extends BoxProps {
  cell: CellState;
  game: GameState;
}

export const cellSize: Dimensions2d = {
  width: 100,
  height: 100,
};

export const CellView: React.FC<Props> = ({ cell, game, ...rest }) => {
  const { owner } = cell;
  const ownerPlayer = owner ? getPlayer(game.players, owner) : undefined;

  const isBottomRow = cell.position.y == game.settings.gridSize.height - 1;
  const isRightCol = cell.position.x == game.settings.gridSize.width - 1;

  const border = `1px dashed rgba(255,255,255,0.5)`;

  return (
    <Box
      width={`${cellSize.width}px`}
      height={`${cellSize.height}px`}
      borderLeft={border}
      borderTop={border}
      borderBottom={isBottomRow ? border : undefined}
      borderRight={isRightCol ? border : undefined}
      position={`relative`}
      {...rest}
    >
      {ownerPlayer && (
        <Box width={`100%`} height={`100%`} position="relative">
          <Box
            width={`100%`}
            height={`100%`}
            backgroundColor={ownerPlayer.color}
            opacity={0.5}
          ></Box>
          <Center
            position="absolute"
            top={0}
            left={0}
            width={`100%`}
            height={`100%`}
            userSelect={"none"}
          >
            {ownerPlayer.avatar}
          </Center>
        </Box>
      )}
    </Box>
  );
};
