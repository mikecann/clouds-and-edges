import { useQueryClient } from "react-query";
import { useCommand } from "../../api/useCommand";

export const useCancelMatch = (matchId: string) => {
  const queryClient = useQueryClient();
  return useCommand({
    aggregate: "match",
    command: "cancel",
    aggregateId: matchId,
    options: {
      onSettled: async () => {
        await queryClient.invalidateQueries(`matches`);
        await queryClient.invalidateQueries(`openMatches`);
      },
    },
  });
};
