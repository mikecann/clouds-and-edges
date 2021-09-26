import * as React from "react";
import { ProjectionKinds } from "@project/shared";
import { Button, VStack } from "@chakra-ui/react";
import { ConnectedInspectableStorage } from "../storage/ConnectedInspectableStorage";
import { useAdminRebuild } from "../useAdminRebuild";

interface Props {
  projection: ProjectionKinds;
}

export const ConnectedProjectionInfo: React.FC<Props> = ({ projection }) => {
  const { mutate } = useAdminRebuild();

  return (
    <VStack maxHeight={600} overflowY={"auto"}>
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
      <ConnectedInspectableStorage identifier={{ kind: "projection", name: projection }} />
    </VStack>
  );
};
