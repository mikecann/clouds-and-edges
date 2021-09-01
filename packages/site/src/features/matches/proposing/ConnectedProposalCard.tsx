import * as React from "react";
import { ProposalCard } from "./ProposalCard";
import { useCancelProposal } from "./useCancelProposal";
import { useAppState } from "../../state/appState";
import { useJoinProposal } from "./useJoinProposal";
import { ProposalProjection } from "@project/shared";

interface Props {
  proposal: ProposalProjection;
}

export const ConnectedProposalCard: React.FC<Props> = ({ proposal }) => {
  const { mutate: onCancel, isLoading: isCancelling } = useCancelProposal(proposal.id);
  const { mutate: onJoin, isLoading: isJoining } = useJoinProposal(proposal.id);
  const [{ userId }] = useAppState();

  return (
    <ProposalCard
      isLoading={isCancelling || isJoining}
      proposal={proposal}
      onCancel={proposal.createdByUserId == userId ? () => onCancel({}) : undefined}
      onJoin={proposal.createdByUserId != userId ? () => onJoin({}) : undefined}
    />
  );
};
