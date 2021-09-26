import * as React from "react";
import { Box, BoxProps, Heading, Text, VStack } from "@chakra-ui/react";
import { calculateScores, getPlayer, PlayerId, Player } from "@project/shared";
import { GameState } from "./game/GameState";
import { IdIcon } from "../misc/IdIcon";

interface Props extends BoxProps {
  playerId: PlayerId;
  game: GameState;
}

export const PlayerPanel: React.FC<Props> = ({ playerId, game, ...rest }) => {
  const player: Player = getPlayer(game.players, playerId);
  const score = calculateScores(game.cells)[playerId] ?? 0;

  return (
    <Box {...rest}>
      <VStack>
        <Heading>{player.avatar}</Heading>
        <Heading color={player.color}>
          {player.name} <IdIcon id={player.id} />
        </Heading>
        {/*<Text>{player.id}</Text>*/}
        <Text>Score: {score}</Text>
      </VStack>
    </Box>
  );
};
