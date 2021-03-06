import * as React from "react";
import { Badge, Button } from "@chakra-ui/react";
import { MatchProjection } from "@project/shared";
import { matchLiteral } from "variant";
import { MatchCard } from "../matches/MatchCard";

interface Props {
  match: MatchProjection;
  meId: string;
  onCancel?: () => any;
  onJoin?: () => any;
  isLoading: boolean;
}

export const OpenMatchCard: React.FC<Props> = ({ match, meId, onCancel, onJoin, isLoading }) => {
  return (
    <MatchCard
      meId={meId}
      match={match}
      actions={
        <>
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
