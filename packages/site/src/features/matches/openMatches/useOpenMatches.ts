import { useQuery } from "react-query";
import { APIOperationOutput } from "@project/shared";
import { useAppState } from "../../state/appState";
import { performRPCOperation } from "../../api/performRPCOperation";

export const useOpenMatches = () => {
  const [{ userId }] = useAppState();
  return useQuery<APIOperationOutput<"projections.matches.getOpen">, Error>(`openMatches`, () =>
    performRPCOperation("projections.matches.getOpen", userId)({ excludePlayer: userId })
  );
};
