import { useQuery } from "react-query";
import { ProjectionKinds } from "@project/shared";
import { performRPCOperation } from "../api/performRPCOperation";
import { useAppState } from "../state/appState";
import { ProjectionDurableObjectAPI } from "@project/workers-es";

export const useProjectionAdminState = (projection: ProjectionKinds) => {
  // const [{ userId }] = useAppState();
  // return useQuery<ProjectionDurableObjectAPI["getAdminState"]["output"], Error>(
  //   [`projection.adminState`, projection],
  //   () =>
  //     performRPCOperation(
  //       "projection.admin",
  //       userId
  //     )({ projection, operation: "getAdminState", payload: {} })
  // );
};
