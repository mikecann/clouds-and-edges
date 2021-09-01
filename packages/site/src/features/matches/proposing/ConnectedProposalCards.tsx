import * as React from "react";
import { useProposals } from "./useProposals";
import { ConnectedProposalCard } from "./ConnectedProposalCard";
import { Wrap, WrapItem } from "@chakra-ui/react";

interface Props {}

export const ConnectedProposalCards: React.FC<Props> = ({}) => {
  const { data: proposals } = useProposals();

  return (
    <Wrap spacing={20}>
      {proposals?.proposals.map((p) => (
        <WrapItem key={p.id}>
          <ConnectedProposalCard proposal={p} />
        </WrapItem>
      ))}
    </Wrap>
  );
};
