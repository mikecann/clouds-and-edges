import { ensure, getLogger } from "@project/essentials";
import { useAppState } from "../state/appState";
import { useQuery } from "react-query";
import { UserProjection } from "@project/shared";
import { performRPCOperation } from "./performRPCOperation";

const logger = getLogger(`useMe`);

export const useMe = () => {
  const [{ userId }] = useAppState();
  return useQuery<UserProjection | null | undefined, Error>(`me`, async () => {
    const { user } = await performRPCOperation(
      "projections.users.findUserById",
      userId
    )({
      id: ensure(userId),
    });
    return user;
  });
};
