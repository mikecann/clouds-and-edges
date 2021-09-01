import { useMutation, useQueryClient } from "react-query";
import { wait } from "@project/essentials";
import { useCommand } from "../../api/useCommand";
import { useGenericErrorHandler } from "../../api/useGenericErrorHandler";

export const useCancelProposal = (proposalId: string) => {
  const queryClient = useQueryClient();
  const onError = useGenericErrorHandler();
  return useMutation(useCommand("proposal", "cancel", proposalId), {
    onSuccess: async ({}) => {
      // Wait a sec then grab the new me
      await wait(200);
      await queryClient.invalidateQueries(`proposals`);
    },
    onError,
  });
};
