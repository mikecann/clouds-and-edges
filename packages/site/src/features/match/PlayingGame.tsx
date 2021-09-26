import * as React from "react";
import { calculateWinner, MatchProjection } from "@project/shared";
import { GameBoard } from "./game/GameBoard";
import { constructGameState } from "./game/GameState";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { useTakeTurn } from "../matches/matches/useTakeTurn";
import { useMe } from "../api/useMe";
import { PlayerPanel } from "./PlayerPanel";
import { Announcement } from "./Announcement";
import { IdIcon } from "../misc/IdIcon";

interface Props {
  match: MatchProjection;
}

export const PlayingGame: React.FC<Props> = ({ match }) => {
  const { mutate: takeTurn } = useTakeTurn(match.id);
  const { data: me } = useMe();

  if (!me) return null;
  if (!match.joinedByUserId) return null;

  const isMyTurn = match.nextPlayerToTakeTurn == me.id;
  const isFinished = match.winner != undefined;
  const canTakeTurn = isMyTurn && !isFinished;

  const game = constructGameState(match);

  return (
    <VStack spacing={8} position={"relative"}>
      <Announcement match={match} meId={me.id} />
      <HStack position={"relative"} spacing={5}>
        <PlayerPanel game={game} playerId={game.players[0].id} width={`300px`} />
        <GameBoard
          game={game}
          onTakeTurn={canTakeTurn ? (from, direction) => takeTurn({ direction, from }) : undefined}
        />
        <PlayerPanel game={game} playerId={game.players[1].id} width={`300px`} />
      </HStack>
    </VStack>
  );
};
