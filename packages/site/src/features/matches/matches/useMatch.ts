import { useApiQuery } from "../../api/useApiQuery";

export const useMatch = (id: string) => {
  return useApiQuery({
    endpoint: "projections.matches.getMatch",
    key: [`match`, id],
    input: { id },
  });
};
