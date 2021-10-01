import * as React from "react";
import { Wrap, WrapItem } from "@chakra-ui/react";
import { useMatches } from "./useMatches";
import { ConnectedMatchCard } from "./ConnectedMatchCard";

interface Props {}

export const ConnectedMatchCards: React.FC<Props> = ({}) => {
  const { data: matches } = useMatches();

  return (
    <Wrap spacing={10}>
      {matches?.map((m) => (
        <WrapItem key={m.id}>
          <ConnectedMatchCard match={m} />
        </WrapItem>
      ))}
    </Wrap>
  );
};
