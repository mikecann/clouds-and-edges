import { useEffect, useState } from "react";
import { apiQuery } from "./apiQuery";
import { QueryNames, QueryInput, QueryOutput } from "@project/shared";
import { useQuery } from "react-query";

export const useApiQuery = <TQuery extends QueryNames>(
  endpoint: TQuery,
  input: QueryInput<TQuery>
): QueryOutput<TQuery> | undefined => {
  //const xx = useQuery<QueryOutput<TQuery>, Error>(endpoint, () => {});

  throw new Error(`naa`);
  // const [data, setData] = useState<QueryOutput<TQuery> | undefined>(undefined);

  // useEffect(() => {
  //   let isCancelled = false;
  //   apiQuery(endpoint, input)
  //     .then((resp) => {
  //       if (isCancelled) return;
  //       setData(resp);
  //     })
  //     .catch((err) => {
  //       if (isCancelled) return;
  //       console.error(`ApiEndpointQuery`, err);
  //       throw err;
  //     });
  //   return () => {
  //     isCancelled = true;
  //   };
  // }, [endpoint, JSON.stringify(input)]);

  // return {  };
};
