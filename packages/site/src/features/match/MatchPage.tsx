import * as React from "react";
import { SidebarPage } from "../page/SidebarPage";
import { Box, Center, Heading, Text, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { PlayingGame } from "./PlayingGame";
import { NotStarted } from "./NotStarted";
import { useMatch } from "../matches/matches/useMatch";
import { matchLiteral } from "variant";
import { Finished } from "./Finished";

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
          {matchLiteral(match.status, {
            playing: () => <PlayingGame match={match} />,
            cancelled: () => <NotStarted />,
            "not-started": () => <NotStarted />,
            finished: () => <Finished match={match} />,
          })}
        </Center>
      </VStack>
    </SidebarPage>
  );
};
