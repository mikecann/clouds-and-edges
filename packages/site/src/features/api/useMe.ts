import { ensure, getLogger } from "@project/essentials";
import { useAppState } from "../state/appState";
import { useQuery } from "react-query";
import { UserProjection } from "@project/shared";
import { performRPCOperation } from "./performRPCOperation";

const logger = getLogger(`useMe`);

export const useMe = () => {
  const [{ userId }] = useAppState();
  //const signout = useSignout();
  return useQuery<UserProjection | null | undefined, Error>(`me`, async () => {
    const { user } = await performRPCOperation(
      "projections.users.findUserById",
      userId
    )({
      id: ensure(userId),
    });
    // if (!user) {
    //   logger.info(`could not get me with id '${userId}' from API so going to signout`);
    //   signout();
    // }
    return user;
  });
};
