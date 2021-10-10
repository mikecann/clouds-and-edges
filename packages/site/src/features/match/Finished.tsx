import * as React from "react";
import { MatchProjection } from "@project/shared";
import { GameBoard } from "./game/GameBoard";
import { constructGameState } from "./game/GameState";
import { HStack, VStack } from "@chakra-ui/react";
import { useMe } from "../me/useMe";
import { PlayerPanel } from "./PlayerPanel";
import { Announcement } from "./Announcement";

interface Props {
  match: MatchProjection;
}

export const Finished: React.FC<Props> = ({ match }) => {
  const { me } = useMe();

  if (!me) return null;

  const game = constructGameState(match);

  return (
    <VStack spacing={8} position={"relative"}>
      <Announcement match={match} meId={me.id} />
      <HStack position={"relative"} spacing={5}>
        <PlayerPanel game={game} playerId={game.players[0].id} width={`300px`} />
        <GameBoard game={game} />
        <PlayerPanel game={game} playerId={game.players[1].id} width={`300px`} />
      </HStack>
    </VStack>
  );
};
