import { ensure, getLogger } from "@project/essentials";
import { useAppState } from "../state/appState";
import { useSignout } from "./useSignout";
import { useQuery } from "react-query";
import { APIOperationOutput } from "@project/shared";
import { performRPCOperation } from "./performRPCOperation";

const logger = getLogger(`useMe`);

export const useMe = () => {
  const [{ userId }] = useAppState();
  const signout = useSignout();
  return useQuery<APIOperationOutput<"projection.user.findUserById">, Error>(`me`, async () => {
    const me = await performRPCOperation("projection.user.findUserById")({ id: ensure(userId) });
    if (!me) {
      logger.info(`could not get me with id '${userId}' from API so going to signout`);
      signout();
    }
    return me;
  });
};
