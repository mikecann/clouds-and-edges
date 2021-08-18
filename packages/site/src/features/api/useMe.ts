import { QueryNames, QueryOutput, ensure } from "@project/shared";
import { useQuery } from "react-query";
import { apiQuery } from "./apiQuery";
import { useAppState } from "../state/appState";

export const useMe = <TQuery extends QueryNames>() => {
  const [{ userId }] = useAppState();
  return useQuery<QueryOutput<"user.get">, Error>(`me`, () =>
    apiQuery("user.get", { id: ensure(userId) })
  );
};
