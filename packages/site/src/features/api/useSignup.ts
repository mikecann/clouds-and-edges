import { useAppState } from "../state/appState";
import { useMutation } from "react-query";
import { performRPCOperation } from "./performRPCOperation";

export const useSignup = () => {
  const [, setState] = useAppState();
  const [{ userId }] = useAppState();
  return useMutation(performRPCOperation("auth.signup", userId), {
    onSuccess: async ({ userId }) => {
      setState((p) => ({ ...p, userId }));
    },
  });
};
