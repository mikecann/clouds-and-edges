import { useMutation, useQueryClient } from "react-query";
import { wait } from "@project/essentials";
import { useCommand } from "../../api/useCommand";

export const useProposeNewMatch = () => {
  const queryClient = useQueryClient();
  return useMutation(useCommand("proposal", "create"), {
    onSuccess: async ({}) => {
      // Wait a sec then grab the new me
      await wait(200);
      await queryClient.invalidateQueries(`proposals`);
    },
  });
};
