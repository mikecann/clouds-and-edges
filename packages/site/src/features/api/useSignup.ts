import { useAppState } from "../state/appState";
import { useMutation } from "react-query";
import { performRPCOperation } from "./performRPCOperation";

export const useSignup = () => {
  const [, setState] = useAppState();
  return useMutation(performRPCOperation("auth.signup"), {
    onSuccess: async ({ userId }) => {
      setState((p) => ({ ...p, userId }));
    },
  });
};
