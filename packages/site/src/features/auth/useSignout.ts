import { useAppState } from "../state/appState";
import { useQueryClient } from "react-query";

export const useSignout = () => {
  const [, setAppState] = useAppState();
  const queryClient = useQueryClient();
  return () => {
    queryClient.clear();
    setAppState((p) => ({ ...p, userId: "" }));
  };
};
