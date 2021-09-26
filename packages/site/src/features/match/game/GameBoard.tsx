import * as React from "react";
import { Box } from "@chakra-ui/react";
import { narray } from "@project/essentials";
import { CellView, cellSize } from "./CellView";
import { Dot, getCellAt, LineDirection } from "@project/shared";
import { DotView } from "./DotView";
import { GameState } from "./GameState";

interface Props {
  game: GameState;
  onTakeTurn?: (from: Dot, direction: LineDirection) => unknown;
}

export const GameBoard: React.FC<Props> = ({ game, onTakeTurn }) => {
  const { settings } = game;

  return (
    <Box
      width={settings.gridSize.width * cellSize.width}
      height={settings.gridSize.height * cellSize.height}
      backgroundColor={"rgba(255,255,0,0.1)"}
      position={"relative"}
    >
      <Box position={"absolute"} top={0} left={0}>
        {narray(settings.gridSize.height)
          .map((y) =>
            narray(settings.gridSize.width).map((x) => (
              <CellView
                key={`${x},${y}`}
                game={game}
                cell={getCellAt(game.cells, { x, y })}
                position={`absolute`}
                top={y * cellSize.height}
                left={x * cellSize.height}
              />
            ))
          )
          .flat()}
      </Box>

      <Box position={"absolute"} top={0} left={0}>
        {narray(settings.gridSize.height + 1)
          .map((y) =>
            narray(settings.gridSize.width + 1).map((x) => (
              <DotView
                key={`${x},${y}`}
                game={game}
                dot={{ x, y }}
                position={`absolute`}
                top={y * cellSize.height}
                left={x * cellSize.height}
                onFillLine={onTakeTurn ? (line) => onTakeTurn({ x, y }, line) : undefined}
              />
            ))
          )
          .flat()}
      </Box>
    </Box>
  );
};
