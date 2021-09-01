import { useQuery } from "react-query";
import { APIOperationOutput } from "@project/shared";
import { useAppState } from "../../state/appState";
import { performRPCOperation } from "../../api/performRPCOperation";
import { ensure } from "@project/essentials";

export const useProposals = () => {
  const [{ userId }] = useAppState();
  return useQuery<APIOperationOutput<"projections.proposals.getProposals">, Error>(
    `proposals`,
    () =>
      performRPCOperation("projections.proposals.getProposals", userId)({ userId: ensure(userId) })
  );
};
