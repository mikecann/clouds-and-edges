import * as React from "react";
import { MatchProjection } from "@project/shared";
import { GameBoard } from "./game/GameBoard";
import { constructGameState } from "./game/GameState";
import { Button, HStack, VStack } from "@chakra-ui/react";
import { useTakeTurn } from "../matches/matches/useTakeTurn";
import { useMe } from "../me/useMe";
import { PlayerPanel } from "./PlayerPanel";
import { Announcement } from "./Announcement";
import { IoReloadOutline } from "react-icons/all";

interface Props {
  match: MatchProjection;
  isLoading: boolean;
  onRefresh: () => unknown;
}

export const PlayingGame: React.FC<Props> = ({ match, isLoading, onRefresh }) => {
  const { mutate: takeTurn } = useTakeTurn(match.id);
  const { me } = useMe();

  if (!me) return null;

  const isMyTurn = match.nextPlayerToTakeTurn == me.id;
  const isFinished = match.winner != undefined;
  const canTakeTurn = isMyTurn && !isFinished;

  const game = constructGameState(match);

  return (
    <VStack spacing={8} position={"relative"}>
      <VStack spacing={0} position={"relative"}>
        <Announcement match={match} meId={me.id} />
        <Button
          colorScheme={"gray"}
          size={"sm"}
          isLoading={isLoading}
          leftIcon={<IoReloadOutline />}
          onClick={onRefresh}
        >
          Refresh
        </Button>
      </VStack>
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
