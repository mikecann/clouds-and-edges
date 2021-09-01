import * as React from "react";
import { ProposalProjection } from "@project/shared";
import { Button, Text, VStack } from "@chakra-ui/react";

interface Props {
  proposal: ProposalProjection;
  onCancel?: () => any;
  onJoin?: () => any;
  isLoading: boolean;
}

export const ProposalCard: React.FC<Props> = ({ proposal, onCancel, onJoin, isLoading }) => {
  return (
    <VStack backgroundColor={"rgba(0,0,0,0.2)"} borderRadius={6} padding={5}>
      <Text as={"h4"}>Id: {proposal.id}</Text>
      <Text as={"h4"}>Proposed By: {proposal.createdByUserId}</Text>
      <Text as={"h4"}>
        Size: {proposal.settings.gridSize.width}x{proposal.settings.gridSize.height}
      </Text>
      {onJoin ? (
        <Button isLoading={isLoading} isDisabled={isLoading} onClick={onJoin} colorScheme={"blue"}>
          Join
        </Button>
      ) : null}
      {onCancel ? (
        <Button isLoading={isLoading} isDisabled={isLoading} onClick={onCancel}>
          Cancel
        </Button>
      ) : null}
    </VStack>
  );
};
