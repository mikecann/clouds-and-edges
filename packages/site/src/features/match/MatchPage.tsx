import * as React from "react";
import { SidebarPage } from "../page/SidebarPage";
import { Button, Heading, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";

interface Props {}

export const MatchPage: React.FC<Props> = ({}) => {
  const { matchId } = useParams<{ matchId: string }>();

  if (!matchId) return null;

  return (
    <SidebarPage>
      <VStack spacing={`50px`}>
        <VStack>
          <Heading>Match {matchId}</Heading>
        </VStack>
      </VStack>
    </SidebarPage>
  );
};
