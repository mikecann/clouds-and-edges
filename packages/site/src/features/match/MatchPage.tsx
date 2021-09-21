import * as React from "react";
import { SidebarPage } from "../page/SidebarPage";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useMatch } from "../matches/matches/useMatch";
import { GameBoard } from "./game/GameBoard";
import { useTakeTurn } from "../matches/matches/useTakeTurn";

interface Props {}

export const MatchPage: React.FC<Props> = ({}) => {
  const { matchId } = useParams<{ matchId: string }>();
  if (!matchId) throw new Error(`Match must be supplied`);

  const { data: match } = useMatch(matchId);
  const { mutate: takeTurn } = useTakeTurn(matchId);

  if (!match) return null;

  return (
    <SidebarPage>
      <VStack spacing={`50px`} overflow={"hidden"}>
        <VStack>
          <Heading>Match </Heading>
          <Text fontSize="xl">{matchId}</Text>
        </VStack>
        <Box>
          {match.game ? (
            <GameBoard game={match.game} onTakeTurn={(cell, line) => takeTurn({ line, cell })} />
          ) : (
            <Box>No Opponent Has Joined Yet </Box>
          )}
        </Box>
      </VStack>
    </SidebarPage>
  );
};
