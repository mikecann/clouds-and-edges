import * as React from "react";
import { SidebarPage } from "../page/SidebarPage";
import { Button, Heading, VStack, Text, Box, Divider } from "@chakra-ui/react";
import { useState } from "react";
import { ConnectedMatchCards } from "./matches/ConnectedMatchCards";
import { ConnectedCreateNewMatchModal } from "./matches/ConnectedCreateNewMatchModal";
import { ConnectedOpenMatches } from "./openMatches/ConnectedOpenMatches";
import { BsPlusSquareFill } from "react-icons/bs";

interface Props {}

export const MatchesPage: React.FC<Props> = ({}) => {
  const [isCreateMatchModalOpen, setIsCreateMatchModalOpen] = useState(false);

  return (
    <SidebarPage>
      <VStack spacing={`20px`} padding={10}>
        <Button
          colorScheme="green"
          size="lg"
          onClick={() => setIsCreateMatchModalOpen(true)}
          leftIcon={<BsPlusSquareFill />}
        >
          New Match
        </Button>

        <VStack padding={5} width="100%">
          <VStack background={"gray.800"}>
            <Heading>My Matches</Heading>
            <Text color="gray.500">My Latest Matches</Text>
          </VStack>
          <Divider width={`100px`} />
          <Box height={5} />
          <ConnectedMatchCards />
        </VStack>

        <VStack padding={5} width="100%">
          <VStack background={"gray.800"}>
            <Heading>Open Matches</Heading>
            <Text color="gray.500">Matches Available to Join</Text>
          </VStack>
          <Divider width={`100px`} />
          <Box height={5} />
          <ConnectedOpenMatches />
        </VStack>
      </VStack>

      <ConnectedCreateNewMatchModal
        isOpen={isCreateMatchModalOpen}
        onClose={() => setIsCreateMatchModalOpen(false)}
      />
    </SidebarPage>
  );
};
