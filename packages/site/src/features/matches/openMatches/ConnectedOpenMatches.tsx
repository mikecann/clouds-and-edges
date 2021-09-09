import * as React from "react";
import { Wrap, WrapItem } from "@chakra-ui/react";
import { useOpenMatches } from "./useOpenMatches";
import { ConnectedOpenMatchCard } from "./ConnectedOpenMatchCard";

interface Props {}

export const ConnectedOpenMatches: React.FC<Props> = ({}) => {
  const { data: matches } = useOpenMatches();

  return (
    <Wrap spacing={20}>
      {matches?.map((m) => (
        <WrapItem key={m.id}>
          <ConnectedOpenMatchCard match={m} />
        </WrapItem>
      ))}
    </Wrap>
  );
};
