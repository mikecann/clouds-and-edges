import { useMutation, useQuery, useQueryClient } from "react-query";
import { wait } from "@project/essentials";
import { performRPCOperation } from "./performRPCOperation";
import { useProjectionAdminState } from "./useProjectionAdminState";
import { APIOperationOutput } from "@project/shared";
import { useAppState } from "../state/appState";

export const useProjectionAdmin = () => {
  const queryClient = useQueryClient();
  const [{ userId }] = useAppState();

  const { data: state } = useProjectionAdminState();

  const { data: storageContents } = useQuery<
    APIOperationOutput<"projections.users.getStorageContents">,
    Error
  >(
    `projections.users.getStorageContents`,
    performRPCOperation("projections.users.getStorageContents", userId)
  );

  const rebuild = useMutation(performRPCOperation("projections.users.rebuild", userId), {
    onSuccess: async ({}) => {
      // Wait a sec then grab the new me
      await wait(200);
      await queryClient.invalidateQueries(`projections.users.getAdminState`);
    },
  });

  return { rebuild, state, storageContents };
};
