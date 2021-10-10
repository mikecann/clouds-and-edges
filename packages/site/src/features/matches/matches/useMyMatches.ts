import { useApiQuery } from "../../api/useApiQuery";

export const useMyMatches = () => {
  return useApiQuery({
    endpoint: "projections.matches.getMine",
    key: `matches`,
    input: {},
  });
};
