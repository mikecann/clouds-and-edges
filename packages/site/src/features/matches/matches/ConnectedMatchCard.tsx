import * as React from "react";
import { useAppState } from "../../state/appState";
import { useCancelMatch } from "./useCancelMatch";
import { useRequestJoinMatch } from "./useJoinMatch";
import { MatchProjection } from "@project/shared";
import { MatchCard } from "./MatchCard";
import { useHistory } from "react-router-dom";

interface Props {
  match: MatchProjection;
}

export const ConnectedMatchCard: React.FC<Props> = ({ match }) => {
  const { mutate: onCancel, isLoading: isCancelling } = useCancelMatch(match.id);
  const { mutate: onJoin, isLoading: isJoining } = useRequestJoinMatch(match.id);
  const [{ userId }] = useAppState();
  const history = useHistory();

  console.log(match);

  const isCreatedByMe = match.createdByUserId == userId;
  const isJoinedByMe = match.players.some((p) => p.id == userId);

  const canJoin = !isCreatedByMe && !isJoinedByMe && match.status == "not-started";
  const canCancel = isCreatedByMe && match.status == "not-started";
  const canOpen =
    ((isCreatedByMe || isJoinedByMe) && match.status == "playing") || match.status == "finished";

  return (
    <MatchCard
      isLoading={isCancelling || isJoining}
      match={match}
      onCancel={canCancel ? () => onCancel({}) : undefined}
      onJoin={canJoin ? () => onJoin({}) : undefined}
      onOpen={canOpen ? () => history.push(`/match/${match.id}`) : undefined}
    />
  );
};
