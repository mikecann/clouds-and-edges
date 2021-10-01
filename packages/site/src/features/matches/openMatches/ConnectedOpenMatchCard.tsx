import { MatchProjection } from "@project/shared";
import * as React from "react";
import { useAppState } from "../../state/appState";
import { useCancelMatch } from "../matches/useCancelMatch";
import { useRequestJoinMatch } from "../matches/useJoinMatch";
import { OpenMatchCard } from "./OpenMatchCard";

interface Props {
  match: MatchProjection;
}

export const ConnectedOpenMatchCard: React.FC<Props> = ({ match }) => {
  const { mutate: cancel, isLoading: isCancelling } = useCancelMatch(match.id);
  const { mutate: join, isLoading: isJoining } = useRequestJoinMatch(match.id);
  const [{ userId }] = useAppState();

  if (!userId) return null;

  return (
    <OpenMatchCard
      meId={userId}
      isLoading={isCancelling || isJoining}
      match={match}
      onCancel={match.createdByUserId == userId ? () => cancel({}) : undefined}
      onJoin={match.createdByUserId != userId ? () => join({}) : undefined}
    />
  );
};
