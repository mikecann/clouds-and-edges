import * as React from "react";
import { Box, BoxProps } from "@chakra-ui/react";
import { GameState, getPlayer, LineState } from "@project/shared";
import { matchKind } from "@project/essentials";

interface Props extends BoxProps {
  line: LineState;
  game: GameState;
  onFill: () => unknown;
}

export const Line: React.FC<Props> = ({ line, game, onFill, ...rest }) => {
  return matchKind(line, {
    empty: () => (
      <Box
        _hover={{ backgroundColor: "#333" }}
        borderRadius={`4px`}
        cursor="pointer"
        onClick={onFill}
        {...rest}
      ></Box>
    ),
    filled: (line) => (
      <Box
        backgroundColor={getPlayer(game.players, line.filledBy).color}
        borderRadius={`4px`}
        {...rest}
      ></Box>
    ),
  });
};
