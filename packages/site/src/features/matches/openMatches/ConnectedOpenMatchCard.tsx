import * as React from "react";
import { useAppState } from "../../state/appState";
import { OpenMatchProjection } from "@project/shared";
import { useCancelMatch } from "../matches/useCancelMatch";
import { useRequestJoinMatch } from "../matches/useJoinMatch";
import { OpenMatchCard } from "./OpenMatchCard";

interface Props {
  match: OpenMatchProjection;
}

export const ConnectedOpenMatchCard: React.FC<Props> = ({ match }) => {
  const { mutate: cancel, isLoading: isCancelling } = useCancelMatch(match.id);
  const { mutate: join, isLoading: isJoining } = useRequestJoinMatch(match.id);
  const [{ userId }] = useAppState();

  return (
    <OpenMatchCard
      isLoading={isCancelling || isJoining}
      match={match}
      onCancel={match.createdByUserId == userId ? () => cancel({}) : undefined}
      onJoin={match.createdByUserId != userId ? () => join({}) : undefined}
    />
  );
};
