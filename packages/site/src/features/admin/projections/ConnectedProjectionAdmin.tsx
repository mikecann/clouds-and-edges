import * as React from "react";
import { ProjectionKinds } from "@project/shared";
import { Button, VStack } from "@chakra-ui/react";
import { ConnectedInspectableStorage } from "../storage/ConnectedInspectableStorage";
import { useAdminRebuild } from "../useAdminRebuild";
import { SectionContainer } from "../SectionContainer";

interface Props {
  projection: ProjectionKinds;
}

export const ConnectedProjectionAdmin: React.FC<Props> = ({ projection }) => {
  const { mutate } = useAdminRebuild();

  return (
    <VStack width={"100%"} overflowY={"auto"} overflowX={"hidden"}>
      <SectionContainer width={"100%"} title={"Actions"}>
        <Button
          onClick={() =>
            mutate({
              identifier: {
                kind: "projection",
                name: projection,
              },
              input: {},
            })
          }
        >
          Rebuild
        </Button>
      </SectionContainer>

      <SectionContainer width={"100%"} title={"Data"}>
        <ConnectedInspectableStorage identifier={{ kind: "projection", name: projection }} />
      </SectionContainer>
    </VStack>
  );
};
