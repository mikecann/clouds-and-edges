import { useQuery } from "react-query";
import { APIOperationOutput } from "@project/shared";
import { useAppState } from "../../state/appState";
import { performRPCOperation } from "../../api/performRPCOperation";
import { ensure } from "@project/essentials";

export const useMatches = () => {
  const [{ userId }] = useAppState();
  return useQuery<APIOperationOutput<"projections.matches.getMine">, Error>(`matches`, () =>
    performRPCOperation("projections.matches.getMine", userId)({ })
  );
};
