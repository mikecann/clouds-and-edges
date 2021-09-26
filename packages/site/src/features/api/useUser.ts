import { ensure, getLogger } from "@project/essentials";
import { useAppState } from "../state/appState";
import { useSignout } from "./useSignout";
import { useQuery } from "react-query";
import { UserProjection } from "@project/shared";
import { performRPCOperation } from "./performRPCOperation";

const logger = getLogger(`useUser`);

export const useUser = (id: string, enabled?: boolean) => {
  return useQuery<UserProjection | null | undefined, Error>(
    [`user`, id],
    async () => {
      const { user } = await performRPCOperation(
        "projections.users.findUserById",
        id
      )({
        id,
      });

      return user;
    },
    { enabled }
  );
};
