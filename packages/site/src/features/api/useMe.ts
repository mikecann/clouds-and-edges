import { ensure, getLogger } from "@project/essentials";

const logger = getLogger(`useMe`);

export const useMe = () => {
  return {} as any;
  // const [{ userId }] = useAppState();
  // const signout = useSignout();
  // return useQuery<QueryOutput<"user.get">, Error>(`me`, async () => {
  //   const me = await performRPCOperation("user.get", { id: ensure(userId) });
  //   if (!me) {
  //     logger.info(`could not get me with id '${userId}' from API so going to signout`);
  //     signout();
  //   }
  //   return me;
  // });
};
