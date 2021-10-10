import { useQueryClient } from "react-query";
import { useCommand } from "../../api/useCommand";

export const useRequestJoinMatch = (matchId: string) => {
  const queryClient = useQueryClient();
  return useCommand({
    aggregate: "match",
    command: "join-request",
    aggregateId: matchId,
    options: {
      onSettled: async () => {
        await queryClient.invalidateQueries(`matches`);
        await queryClient.invalidateQueries(`openMatches`);
      },
    },
  });
};
