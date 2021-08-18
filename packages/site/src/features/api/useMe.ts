import { QueryNames, QueryOutput } from "@project/shared";
import { useQuery } from "react-query";
import { apiQuery } from "./apiQuery";
import { useAppState } from "../state/appState";
import { useSignout } from "./useSignout";
import { ensure, getLogger } from "@project/essentials";

const logger = getLogger(`useMe`);

export const useMe = <TQuery extends QueryNames>() => {
  const [{ userId }] = useAppState();
  const signout = useSignout();
  return useQuery<QueryOutput<"user.get">, Error>(`me`, async () => {
    const me = await apiQuery("user.get", { id: ensure(userId) });
    if (!me) {
      logger.info(`could not get me with id '${userId}' from API so going to signout`);
      signout();
    }
    return me;
  });
};
