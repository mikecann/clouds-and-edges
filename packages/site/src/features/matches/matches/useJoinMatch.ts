import { useMutation, useQueryClient } from "react-query";
import { wait } from "@project/essentials";
import { useCommand } from "../../api/useCommand";
import { useGenericErrorHandler } from "../../api/useGenericErrorHandler";

export const useRequestJoinMatch = (proposalId: string) => {
  const queryClient = useQueryClient();
  const onError = useGenericErrorHandler();
  return useMutation(useCommand("match", "join-request", proposalId), {
    onSettled: async () => {
      // Wait a sec then grab the new me
      await wait(200);
      await queryClient.invalidateQueries(`matches`);
      await queryClient.invalidateQueries(`openMatches`);
    },
    onError,
  });
};
