import * as React from "react";
import { Button, Text, VStack } from "@chakra-ui/react";
import { OpenMatchProjection } from "@project/shared";

interface Props {
  match: OpenMatchProjection;
  onCancel?: () => any;
  onJoin?: () => any;
  isLoading: boolean;
}

export const OpenMatchCard: React.FC<Props> = ({ match, onCancel, onJoin, isLoading }) => {
  return (
    <VStack backgroundColor={"rgba(0,0,0,0.2)"} borderRadius={6} padding={5}>
      <Text as={"h4"}>Id: {match.id}</Text>
      <Text as={"h4"}>Proposed By: {match.createdByUserId}</Text>
      <Text as={"h4"}>
        Size: {match.settings.gridSize.width}x{match.settings.gridSize.height}
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
