import * as React from "react";
import { Badge, Button } from "@chakra-ui/react";
import { MatchProjection } from "@project/shared";
import { matchLiteral } from "variant";
import { MatchCard } from "./MatchCard";

interface Props {
  match: MatchProjection;
  onCancel?: () => any;
  onJoin?: () => any;
  onOpen?: () => any;
  isLoading: boolean;
  meId: string;
}

export const MyMatchCard: React.FC<Props> = ({
  match,
  meId,
  onCancel,
  onJoin,
  onOpen,
  isLoading,
}) => {
  return (
    <MatchCard
      meId={meId}
      match={match}
      actions={
        <>
          {onOpen ? (
            <Button
              isLoading={isLoading}
              isDisabled={isLoading}
              onClick={onOpen}
              colorScheme={"blue"}
            >
              Open
            </Button>
          ) : null}
          {onJoin ? (
            <Button
              isLoading={isLoading}
              isDisabled={isLoading}
              onClick={onJoin}
              colorScheme={"blue"}
            >
              Join
            </Button>
          ) : null}
          {onCancel ? (
            <Button isLoading={isLoading} isDisabled={isLoading} onClick={onCancel}>
              Cancel
            </Button>
          ) : null}
        </>
      }
    ></MatchCard>
  );
};
