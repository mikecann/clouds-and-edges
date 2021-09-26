import * as React from "react";
import { Box, BoxProps } from "@chakra-ui/react";
import { getPlayer, LineDirection, PlayerId, Player } from "@project/shared";
import { matchKind, Point2D } from "@project/essentials";
import { GameState } from "./GameBoard";

interface Props extends BoxProps {
  from: Point2D;
  direction: LineDirection;
  owner?: PlayerId;
  game: GameState;
  onFill?: () => unknown;
}

export const LineView: React.FC<Props> = ({ from, direction, owner, game, onFill, ...rest }) => {
  if (owner)
    return (
      <Box
        backgroundColor={getPlayer(game.players, owner).color}
        borderRadius={`4px`}
        {...rest}
      ></Box>
    );

  return (
    <Box
      _hover={onFill ? { backgroundColor: `rgba(0,0,0,0.5)` } : undefined}
      borderRadius={`4px`}
      cursor={onFill ? "pointer" : undefined}
      onClick={onFill}
      {...rest}
    ></Box>
  );
};
