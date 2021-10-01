import * as React from "react";
import { Wrap, WrapItem } from "@chakra-ui/react";
import { useOpenMatches } from "./useOpenMatches";
import { ConnectedOpenMatchCard } from "./ConnectedOpenMatchCard";
import { useAppState } from "../../state/appState";

interface Props {}

export const ConnectedOpenMatches: React.FC<Props> = ({}) => {
  const { data: matches } = useOpenMatches();

  return (
    <Wrap spacing={20}>
      {matches?.map((m) => (
        <ConnectedOpenMatchCard  key={m.id} match={m} />
      ))}
    </Wrap>
  );
};
