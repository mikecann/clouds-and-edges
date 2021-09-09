import * as React from "react";
import { useAppState } from "../../state/appState";
import { useCancelMatch } from "./useCancelMatch";
import { useJoinMatch } from "./useJoinMatch";
import { MatchProjection } from "@project/shared";
import { MatchCard } from "./MatchCard";

interface Props {
  match: MatchProjection;
}

export const ConnectedMatchCard: React.FC<Props> = ({ match }) => {
  const { mutate: onCancel, isLoading: isCancelling } = useCancelMatch(match.id);
  const { mutate: onJoin, isLoading: isJoining } = useJoinMatch(match.id);
  const [{ userId }] = useAppState();

  const isCreatedByMe = match.createdByUserId == userId;
  const isStarted = match.status != "not-started";
  const canJoin = !isCreatedByMe && !isStarted;
  const canCancel = isCreatedByMe && !isStarted;

  return (
    <MatchCard
      isLoading={isCancelling || isJoining}
      match={match}
      onCancel={canCancel ? () => onCancel({}) : undefined}
      onJoin={canJoin ? () => onJoin({}) : undefined}
    />
  );
};
