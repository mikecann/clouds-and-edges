import { useQuery } from "react-query";
import { APIOperationOutput } from "@project/shared";
import { useAppState } from "../../state/appState";
import { performRPCOperation } from "../../api/performRPCOperation";

export const useMatch = (id: string) => {
  const [{ userId }] = useAppState();
  return useQuery<APIOperationOutput<"projections.matches.getMatch">, Error>([`match`, id], () =>
    performRPCOperation("projections.matches.getMatch", userId)({ id })
  );
};
