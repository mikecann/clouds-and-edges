import { QueryNames, QueryInput, QueryOutput, ensure } from "@project/shared";
import { useQuery } from "react-query";
import { useAppState } from "../state/app";
import { apiQuery } from "./apiQuery";

export const useMe = <TQuery extends QueryNames>() => {
  const [{ userId }] = useAppState();
  return useQuery<QueryOutput<TQuery>, Error>(`me`, () =>
    apiQuery("user.get", { id: ensure(userId) })
  );
};
