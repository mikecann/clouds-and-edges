import * as React from "react";
import { SidebarPage } from "../page/SidebarPage";
import { Button, Heading, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { ConnectedMatchCards } from "./matches/ConnectedMatchCards";
import { ConnectedCreateNewMatchModal } from "./matches/ConnectedCreateNewMatchModal";
import { ConnectedOpenMatches } from "./openMatches/ConnectedOpenMatches";

interface Props {}

export const MatchesPage: React.FC<Props> = ({}) => {
  const [isCreateMatchModalOpen, setIsCreateMatchModalOpen] = useState(false);

  return (
    <SidebarPage>
      <VStack spacing={`50px`}>
        <VStack>
          <Heading>My Matches</Heading>
          <Button onClick={() => setIsCreateMatchModalOpen(true)}>New Match</Button>
          <ConnectedMatchCards />
        </VStack>

        <VStack>
          <Heading>Open Matches</Heading>
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
