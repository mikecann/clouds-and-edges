import { useQuery } from "react-query";
import { APIOperationOutput } from "@project/shared";
import { performRPCOperation } from "./performRPCOperation";
import { useAppState } from "../state/appState";

export const useProjectionAdminState = () => {
  const [{ userId }] = useAppState();
  return useQuery<APIOperationOutput<"projections.users.getAdminState">, Error>(
    `projections.users.getAdminState`,
    performRPCOperation("projections.users.getAdminState", userId)
  );
};
