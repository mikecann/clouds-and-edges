import { useQueryClient } from "react-query";
import { useCommand } from "../../api/useCommand";

export const useTakeTurn = (matchId: string) => {
  const queryClient = useQueryClient();
  return useCommand({
    aggregate: "match",
    command: "take-turn",
    aggregateId: matchId,
    options: {
      onSettled: async () => {
        await queryClient.invalidateQueries(`matches`);
        await queryClient.invalidateQueries(`openMatches`);
        await queryClient.invalidateQueries([`match`, matchId]);
      },
    },
  });
};
