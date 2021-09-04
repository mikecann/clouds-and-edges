import * as React from "react";
import { ProcessKinds, ProjectionKinds } from "@project/shared";
import { Button, VStack } from "@chakra-ui/react";
import { ConnectedInspectableStorage } from "../storage/ConnectedInspectableStorage";

interface Props {
  process: ProcessKinds;
}

export const ConnectedProcessInfo: React.FC<Props> = ({ process }) => {
  //const { rebuild, state, storageContents } = useProjectionAdmin(projection);

  //if (!state || !storageContents) return null;

  return (
    <VStack maxHeight={600} overflowY={"auto"}>
      <Button onClick={() => {}}>Rebuild</Button>
      <ConnectedInspectableStorage identifier={{ kind: "process", name: process }} />
    </VStack>
  );
};
