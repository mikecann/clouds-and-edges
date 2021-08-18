import { useMutation } from "react-query";
import { apiMutate } from "./apiMutate";
import { useAppState } from "../state/appState";

export const useSignup = () => {
  const [, setState] = useAppState();
  return useMutation(
    ({ name }: { name: string }) =>
      apiMutate("auth.signup", {
        name,
      }),
    {
      onSuccess: async ({ userId }) => {
        setState((p) => ({ ...p, userId }));
      },
    }
  );
};
