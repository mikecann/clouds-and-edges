import { useMutation, useQueryClient } from "react-query";
import { wait } from "@project/essentials";
import { useCommand } from "../../api/useCommand";
import { useAppState } from "../../state/appState";

export const useCreateNewMatch = () => {
  const queryClient = useQueryClient();
  const [{ userId }] = useAppState();
  return useMutation(useCommand("user", "create-match-request", userId), {
    onSettled: async () => {
      // Wait a sec then grab the new me
      await wait(200);
      await queryClient.invalidateQueries(`matches`);
      await queryClient.invalidateQueries(`openMatches`);
    },
  });
};
