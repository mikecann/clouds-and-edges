import { useMutation, useQuery, useQueryClient } from "react-query";
import { wait } from "@project/essentials";
import { performRPCOperation } from "../api/performRPCOperation";
import { useProjectionAdminState } from "./useProjectionAdminState";
import { ProjectionKinds } from "@project/shared";
import { useAppState } from "../state/appState";
import { ProjectionDurableObjectAPI } from "@project/workers-es";

export const useProjectionAdmin = (projection: ProjectionKinds) => {
  const queryClient = useQueryClient();
  const [{ userId }] = useAppState();

  const { data: state } = useProjectionAdminState(projection);

  const { data: storageContents } = useQuery<
    ProjectionDurableObjectAPI["getStorageContents"]["output"],
    Error
  >([`projection.contents`, projection], () =>
    performRPCOperation(
      "projection.admin",
      userId
    )({ projection, operation: "getStorageContents", payload: {} })
  );

  const rebuild = useMutation(
    () =>
      performRPCOperation(
        "projection.admin",
        userId
      )({ operation: "rebuild", projection, payload: {} }),
    {
      onSuccess: async ({}) => {
        // Wait a sec then grab the new me
        await wait(200);
        await queryClient.invalidateQueries([projection]);
      },
    }
  );

  return { rebuild, state, storageContents };
};
