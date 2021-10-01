import * as React from "react";
import { Box, Heading, VStack } from "@chakra-ui/react";

interface Props {}

export const NotStarted: React.FC<Props> = ({}) => {
  return (
    <VStack>
      <Heading>Match Cancelled</Heading>
      <Box>Nothing to see here</Box>
    </VStack>
  );
};
