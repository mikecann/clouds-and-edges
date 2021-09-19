import { useQuery } from "react-query";
import { performRPCOperation } from "../api/performRPCOperation";
import { useAppState } from "../state/appState";
import { QueryStorageAPI , DurableObjectIdentifier } from "@project/workers-es";

interface Options {
  identifier: DurableObjectIdentifier;
  input: QueryStorageAPI["input"];
}

export const useQueryStorage = ({ identifier, input }: Options) => {
  const [{ userId }] = useAppState();
  return useQuery<QueryStorageAPI["output"], Error>([`storageQuery`, identifier, input], () =>
    performRPCOperation("admin.queryStorage", userId)({ identifier, input })
  );
};
