import * as React from "react";
import { ProcessKinds, ProjectionKinds } from "@project/shared";
import { Button, VStack } from "@chakra-ui/react";
import { ConnectedInspectableStorage } from "../storage/ConnectedInspectableStorage";
import { SectionContainer } from "../SectionContainer";

interface Props {
  process: ProcessKinds;
}

export const ConnectedProcessAdmin: React.FC<Props> = ({ process }) => {
  //const { rebuild, state, storageContents } = useProjectionAdmin(projection);

  //if (!state || !storageContents) return null;

  return (
    <VStack width={"100%"} overflowY={"auto"} overflowX={"hidden"}>
      <SectionContainer width={"100%"} title={"Actions"}>
        <Button onClick={() => {}}>Rebuild</Button>
      </SectionContainer>

      <SectionContainer width={"100%"} title={"Data"}>
        <ConnectedInspectableStorage identifier={{ kind: "process", name: process }} />
      </SectionContainer>
    </VStack>
  );
};
