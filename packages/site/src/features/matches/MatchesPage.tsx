import * as React from "react";
import { SidebarPage } from "../page/SidebarPage";
import { Button, Heading, VStack } from "@chakra-ui/react";
import { ConnectedProposeNewMatchModal } from "./proposing/ConnectedProposeNewMatchModal";
import { useState } from "react";
import { ConnectedProposalCards } from "./proposing/ConnectedProposalCards";

interface Props {}

export const MatchesPage: React.FC<Props> = ({}) => {
  const [isProposeNewMatchOpen, setIsProposeNewMatchOpen] = useState(false);

  return (
    <SidebarPage>
      <VStack>
        <Heading>Proposals</Heading>
        <Button onClick={() => setIsProposeNewMatchOpen(true)}>Propose New Match</Button>
        <ConnectedProposalCards />
      </VStack>
      <ConnectedProposeNewMatchModal
        isOpen={isProposeNewMatchOpen}
        onClose={() => setIsProposeNewMatchOpen(false)}
      />
      <VStack>
        <Heading>Matches</Heading>
        <ConnectedProposalCards />
      </VStack>
    </SidebarPage>
  );
};
