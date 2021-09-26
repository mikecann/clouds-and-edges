import { useMutation } from "react-query";
import { useRPCOperation } from "../api/useRPCOperation";
import { useGenericErrorHandler } from "../api/useGenericErrorHandler";

export const useAdminRebuild = () => {
  const onError = useGenericErrorHandler();
  return useMutation(useRPCOperation("admin.rebuild"), {
    onError,
  });
};
