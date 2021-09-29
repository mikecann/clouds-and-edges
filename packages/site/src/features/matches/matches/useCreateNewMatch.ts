import { useMutation, useQueryClient } from "react-query";
import { wait } from "@project/essentials";
import { useCommand } from "../../api/useCommand";

export const useCreateNewMatch = () => {
  const queryClient = useQueryClient();
  return useMutation(useCommand("user", "create-match-request"), {
    onSettled: async () => {
      // Wait a sec then grab the new me
      await wait(200);
      await queryClient.invalidateQueries(`matches`);
      await queryClient.invalidateQueries(`openMatches`);
    },
  });
};
