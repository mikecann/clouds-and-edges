import * as React from "react";
import { ProjectionInfo } from "./ProjectionInfo";
import { useProjectionAdmin } from "../../api/useProjectionAdmin";

interface Props {}

export const ConnectedProjectionInfo: React.FC<Props> = ({}) => {
  const { rebuild, state, storageContents } = useProjectionAdmin();

  if (!state || !storageContents) return null;

  return (
    <ProjectionInfo
      adminState={state}
      onRebuild={() => rebuild.mutate({})}
      storageContents={storageContents.contents}
    />
  );
};
