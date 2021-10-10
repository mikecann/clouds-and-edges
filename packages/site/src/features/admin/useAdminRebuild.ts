import { useApiMutation } from "../api/useApiMutation";

export const useAdminRebuild = () => {
  return useApiMutation("admin.rebuild");
};
