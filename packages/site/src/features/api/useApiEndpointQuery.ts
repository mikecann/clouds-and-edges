import { useEffect, useState } from "react";
import { callApiEndpoint } from "./callApiEndpoint";

interface Options {
  path: string;
  input?: unknown;
}

export const useApiEndpointQuery = ({ path, input }: Options) => {
  const [data, setData] = useState<unknown>(undefined);

  useEffect(() => {
    let isCancelled = false;
    callApiEndpoint({ path, input, method: "GET" })
      .then(resp => {
        if (isCancelled) return;
        setData(resp);
      })
      .catch(err => {
        if (isCancelled) return;
        console.error(`ApiEndpointQuery`, err);
        throw err;
      });
    return () => {
      isCancelled = true;
    };
  }, [path, input]);

  return data;
};
