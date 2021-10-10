import { useAppState } from "../../state/appState";
import { useApiQuery } from "../../api/useApiQuery";

export const useOpenMatches = () => {
  const [{ userId }] = useAppState();
  return useApiQuery({
    endpoint: "projections.matches.getOpen",
    key: `matches`,
    input: {
      excludePlayer: userId,
    },
  });
};
