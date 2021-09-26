import * as React from "react";
import { Box, Heading, VStack } from "@chakra-ui/react";
import { IdIcon } from "../misc/IdIcon";
import { MatchProjection } from "@project/shared";

interface Props {
  match: MatchProjection;
}

export const NoOpponent: React.FC<Props> = ({ match }) => {
  return (
    <VStack>
      <Heading>Match Not Started</Heading>
      <Box>Waiting for an opponent to join you..</Box>
    </VStack>
  );
};
