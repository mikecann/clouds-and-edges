import * as React from "react";
import { ProjectionInfo } from "./ProjectionInfo";
import { useProjectionAdmin } from "../useProjectionAdmin";
import { ProjectionKinds } from "@project/shared";

interface Props {
  projection: ProjectionKinds;
}

export const ConnectedProjectionInfo: React.FC<Props> = ({ projection }) => {
  const { rebuild, state, storageContents } = useProjectionAdmin(projection);

  if (!state || !storageContents) return null;

  return (
    <ProjectionInfo
      adminState={state}
      onRebuild={() => rebuild.mutate()}
      storageContents={storageContents.contents}
    />
  );
};
