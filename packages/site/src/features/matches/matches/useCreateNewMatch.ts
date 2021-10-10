import { useQueryClient } from "react-query";
import { useCommand } from "../../api/useCommand";
import { useAppState } from "../../state/appState";

export const useCreateNewMatch = () => {
  const [{ userId }] = useAppState();
  const queryClient = useQueryClient();
  return useCommand({
    aggregate: "user",
    command: "create-match-request",
    aggregateId: userId,
    options: {
      onSettled: async () => {
        await queryClient.invalidateQueries(`matches`);
        await queryClient.invalidateQueries(`openMatches`);
      },
    },
  });
};
