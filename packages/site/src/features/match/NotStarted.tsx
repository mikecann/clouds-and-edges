import * as React from "react";
import { Box, Heading, VStack } from "@chakra-ui/react";

interface Props {}

export const NotStarted: React.FC<Props> = ({}) => {
  return (
    <VStack>
      <Heading>Match Not Started</Heading>
      <Box>Waiting for an opponent to join you..</Box>
    </VStack>
  );
};
