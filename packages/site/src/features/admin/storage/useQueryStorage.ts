import { QueryStorageAPI, DurableObjectIdentifier } from "@project/workers-es";
import { useApiQuery } from "../../api/useApiQuery";

interface Options {
  identifier: DurableObjectIdentifier;
  input: QueryStorageAPI["input"];
}

export const useQueryStorage = ({ identifier, input }: Options) => {
  return useApiQuery({
    endpoint: "admin.queryStorage",
    key: [`storageQuery`, identifier, input],
    input: {
      input,
      identifier,
    },
  });
};
