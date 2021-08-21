import { useQuery } from "react-query";
import { APIOperationOutput } from "@project/shared";
import { performRPCOperation } from "./performRPCOperation";

export const useProjectionAdminState = () => {
  return useQuery<APIOperationOutput<"projections.users.getAdminState">, Error>(
    `projections.users.getAdminState`,
    performRPCOperation("projections.users.getAdminState")
  );
};
