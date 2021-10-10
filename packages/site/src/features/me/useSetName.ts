import { ensure } from "@project/essentials";
import { useAppState } from "../state/appState";
import { useCommand } from "../api/useCommand";

export const useSetName = () => {
  const [{ userId }] = useAppState();
  return useCommand({
    aggregate: "user",
    command: "set-name",
    aggregateId: ensure(userId),
  });
};
