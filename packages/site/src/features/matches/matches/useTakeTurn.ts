import { useMutation, useQueryClient } from "react-query";
import { useCommand } from "../../api/useCommand";
import { useGenericErrorHandler } from "../../api/useGenericErrorHandler";

export const useTakeTurn = (matchId: string) => {
  const queryClient = useQueryClient();
  const onError = useGenericErrorHandler();
  return useMutation(useCommand("match", "take-turn", matchId), {
    onSettled: async () => {
      await queryClient.invalidateQueries(`matches`);
      await queryClient.invalidateQueries(`openMatches`);
      await queryClient.invalidateQueries([`match`, matchId]);
    },
    onError,
  });
};
