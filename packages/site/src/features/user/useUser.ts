import { ensure } from "@project/essentials";
import { useAppState } from "../state/appState";
import { useApiQuery } from "../api/useApiQuery";

export const useUser = (id: string, enabled?: boolean) => {
  const [{ userId }] = useAppState();
  return useApiQuery({
    endpoint: "projections.users.findUserById",
    key: [`user`, id],
    input: { id: ensure(userId) },
    options: {
      enabled,
    },
  });
};
