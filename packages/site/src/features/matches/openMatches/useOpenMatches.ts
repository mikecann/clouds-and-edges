import { useQuery } from "react-query";
import { APIOperationOutput } from "@project/shared";
import { useAppState } from "../../state/appState";
import { performRPCOperation } from "../../api/performRPCOperation";

export const useOpenMatches = () => {
  const [{ userId }] = useAppState();
  return useQuery<APIOperationOutput<"projections.openMatches.getOpenMatches">, Error>(
    `openMatches`,
    () => performRPCOperation("projections.openMatches.getOpenMatches", userId)({})
  );
};
