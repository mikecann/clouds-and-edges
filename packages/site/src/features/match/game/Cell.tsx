import * as React from "react";
import { Box, Center } from "@chakra-ui/react";
import { CellState, Dimensions2d, GameState, getPlayer, LineSide } from "@project/shared";
import { Line } from "./Line";

interface Props {
  cell: CellState;
  game: GameState;
  onFillLine: (line: LineSide) => unknown;
}

export const cellSize: Dimensions2d = {
  width: 100,
  height: 100,
};

const lineSize = 15;

export const Cell: React.FC<Props> = ({ cell, game, onFillLine }) => {
  const { position, owner, lines } = cell;

  const ownerPlayer = owner ? getPlayer(game, owner) : undefined;

  return (
    <Box
      width={`${cellSize.width}px`}
      height={`${cellSize.height}px`}
      border={`1px dashed #333`}
      position={`relative`}
    >
      {ownerPlayer && (
        <Box width={`100%`} height={`100%`} position="relative">
          <Box
            width={`100%`}
            height={`100%`}
            backgroundColor={ownerPlayer.color}
            opacity={0.5}
          ></Box>
          <Center position="absolute" top={0} left={0} width={`100%`} height={`100%`}>
            {ownerPlayer.avatarEmoji}
          </Center>
        </Box>
      )}

      {/*Top*/}
      {position.y == 0 && (
        <Line
          width={`${cellSize.width}px`}
          height={`${lineSize}px`}
          position={`absolute`}
          top={`-${lineSize / 2}px`}
          left={0}
          zIndex={1}
          line={lines.top}
          game={game}
          onFill={() => onFillLine("top")}
        />
      )}

      {/*Bottom*/}
      <Line
        width={`${cellSize.width}px`}
        height={`${lineSize}px`}
        position={`absolute`}
        bottom={`-${lineSize / 2}px`}
        left={0}
        zIndex={1}
        line={lines.bottom}
        game={game}
        onFill={() => onFillLine("bottom")}
      />

      {/*Left*/}
      {position.x == 0 && (
        <Line
          width={`${lineSize}px`}
          height={`${cellSize.width}px`}
          position={`absolute`}
          left={`-${lineSize / 2}px`}
          top={0}
          zIndex={1}
          line={lines.left}
          game={game}
          onFill={() => onFillLine("left")}
        />
      )}

      {/*Right*/}
      <Line
        width={`${lineSize}px`}
        height={`${cellSize.width}px`}
        position={`absolute`}
        right={`-${lineSize / 2}px`}
        top={0}
        zIndex={1}
        line={lines.right}
        game={game}
        onFill={() => onFillLine("right")}
      />
    </Box>
  );
};
