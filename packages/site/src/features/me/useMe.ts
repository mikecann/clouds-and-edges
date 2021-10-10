import { ensure, getLogger } from "@project/essentials";
import { useAppState } from "../state/appState";
import { useApiQuery } from "../api/useApiQuery";

export const useMe = () => {
  const [{ userId }] = useAppState();
  const query = useApiQuery({
    endpoint: "projections.users.findUserById",
    key: `me`,
    input: { id: ensure(userId) },
    options: {
      enabled: userId != undefined,
    },
  });

  return {
    ...query,
    me: query.data?.user,
  };
};
