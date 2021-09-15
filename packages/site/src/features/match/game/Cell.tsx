import * as React from "react";
import { Box } from "@chakra-ui/react";
import { CellState, Dimensions2d, GameState } from "@project/shared";
import { Line } from "./Line";

interface Props {
  cell: CellState;
  game: GameState;
}

export const cellSize: Dimensions2d = {
  width: 100,
  height: 100,
};

const lineSize = 15;

export const Cell: React.FC<Props> = ({ cell }) => {
  const { position, owner, lines } = cell;

  return (
    <Box
      width={`${cellSize.width}px`}
      height={`${cellSize.height}px`}
      backgroundColor={`tomato`}
      position={`relative`}
    >
      {/*Top*/}
      {position.y == 0 && (
        <Line
          width={`${cellSize.width}px`}
          height={`${lineSize}px`}
          position={`absolute`}
          backgroundColor={`green`}
          top={`-${lineSize / 2}px`}
          left={0}
          zIndex={1}
        />
      )}

      {/*Bottom*/}
      <Line
        width={`${cellSize.width}px`}
        height={`${lineSize}px`}
        position={`absolute`}
        backgroundColor={`blue`}
        bottom={`-${lineSize / 2}px`}
        left={0}
        zIndex={1}
      />

      {/*Left*/}
      {position.x == 0 && (
        <Line
          width={`${lineSize}px`}
          height={`${cellSize.width}px`}
          position={`absolute`}
          backgroundColor={`pink`}
          left={`-${lineSize / 2}px`}
          top={0}
          zIndex={1}
        />
      )}

      {/*Right*/}
      <Line
        width={`${lineSize}px`}
        height={`${cellSize.width}px`}
        position={`absolute`}
        backgroundColor={`yellow`}
        right={`-${lineSize / 2}px`}
        top={0}
        zIndex={1}
      />
    </Box>
  );
};
