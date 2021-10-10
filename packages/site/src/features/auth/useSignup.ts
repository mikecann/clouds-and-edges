import { useAppState } from "../state/appState";
import { useApiMutation } from "../api/useApiMutation";

export const useSignup = () => {
  const [, setState] = useAppState();
  return useApiMutation("auth.signup", {
    onSuccess: async ({ userId }) => {
      setState((p) => ({ ...p, userId }));
    },
  });
};
