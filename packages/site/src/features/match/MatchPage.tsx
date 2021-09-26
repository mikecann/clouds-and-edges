import * as React from "react";
import { SidebarPage } from "../page/SidebarPage";
import { Box, Center, Heading, Text, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useMatch } from "../matches/matches/useMatch";
import { PlayingGame } from "./PlayingGame";
import { IdIcon } from "../misc/IdIcon";
import { NoOpponent } from "./NoOpponent";

interface Props {}

export const MatchPage: React.FC<Props> = ({}) => {
  const { matchId } = useParams<{ matchId: string }>();
  if (!matchId) throw new Error(`Match must be supplied`);

  const { data: match } = useMatch(matchId);

  if (!match) return null;

  return (
    <SidebarPage>
      <VStack overflow={"hidden"} height={"100vh"}>
        <Center flex={1} minHeight={0}>
          {match.joinedByUserId ? <PlayingGame match={match} /> : <NoOpponent match={match} />}
        </Center>
      </VStack>
    </SidebarPage>
  );
};
