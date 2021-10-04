import * as React from "react";
import { Box, BoxProps, Center } from "@chakra-ui/react";
import { getPlayer, LineDirection, Dot, findLineOwner } from "@project/shared";
import { LineView } from "./LineView";
import { cellSize } from "./CellView";
import { GameState } from "./GameState";
import { Logo } from "../../logo/Logo";
import { CloudflareLogo } from "../../logo/CloudflareLogo";

interface Props extends BoxProps {
  game: GameState;
  dot: Dot;
  onFillLine?: (direction: LineDirection) => unknown;
}

const lineSize = 15;

export const DotView: React.FC<Props> = ({ dot, game, onFillLine, ...rest }) => {
  const isBottomRow = dot.y == game.settings.gridSize.height;
  const isRightCol = dot.x == game.settings.gridSize.width;

  return (
    <Box position={`relative`} {...rest}>
      {/* Down */}
      {isBottomRow ? null : (
        <LineView
          height={`${cellSize.width}px`}
          width={`${lineSize}px`}
          position={`absolute`}
          top={0}
          left={`-${lineSize / 2}px`}
          from={dot}
          direction={"down"}
          game={game}
          owner={findLineOwner(game.lines, dot, "down")}
          onFill={onFillLine ? () => onFillLine("down") : undefined}
        />
      )}

      {/* Right */}
      {isRightCol ? null : (
        <LineView
          width={`${cellSize.width}px`}
          height={`${lineSize}px`}
          position={`absolute`}
          top={`-${lineSize / 2}px`}
          left={0}
          from={dot}
          direction={"right"}
          owner={findLineOwner(game.lines, dot, "right")}
          game={game}
          onFill={onFillLine ? () => onFillLine("right") : undefined}
        />
      )}

      <Box
        position={`absolute`}
        top={`-25px`}
        left={`-25px`}
        borderRadius={`50%`}
        width={`50px`}
        height={`50px`}
        //backgroundColor={`tomato`}
      >
        <CloudflareLogo width={`50px`} height={`50px`} />
      </Box>
    </Box>
  );
};
