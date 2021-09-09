import * as React from "react";
import { useAppState } from "../../state/appState";
import { MatchProjection, OpenMatchProjection } from "@project/shared";
import { useCancelMatch } from "../matches/useCancelMatch";
import { useJoinMatch } from "../matches/useJoinMatch";
import { OpenMatchCard } from "./OpenMatchCard";

interface Props {
  match: OpenMatchProjection;
}

export const ConnectedOpenMatchCard: React.FC<Props> = ({ match }) => {
  const { mutate: onCancel, isLoading: isCancelling } = useCancelMatch(match.id);
  const { mutate: onJoin, isLoading: isJoining } = useJoinMatch(match.id);
  const [{ userId }] = useAppState();

  return (
    <OpenMatchCard
      isLoading={isCancelling || isJoining}
      match={match}
      onCancel={match.createdByUserId == userId ? () => onCancel({}) : undefined}
      onJoin={match.createdByUserId != userId ? () => onJoin({}) : undefined}
    />
  );
};
