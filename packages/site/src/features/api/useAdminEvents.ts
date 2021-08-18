import { QueryNames, QueryOutput, ensure } from "@project/shared";
import { useQuery } from "react-query";
import { apiQuery } from "./apiQuery";

export const useAdminEvents = <TQuery extends QueryNames>() => {
  return useQuery<QueryOutput<"admin.events">, Error>(`admin.events`, () =>
    apiQuery("admin.events", {})
  );
};
