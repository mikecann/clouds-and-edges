import { APIEndpointHandler } from "../durableObjects/rpc";
import { Logger } from "@project/essentials";

interface Options {
  storage: DurableObjectStorage;
  logger: Logger;
}

type JSONType = string | boolean | object | null | undefined;

export interface QueryStorageAPI {
  input: {
    query?: string;
    limit?: number;
    skip?: number;
  };
  output: Record<string, JSONType>;
}

export const queryStorage =
  ({ storage, logger }: Options): APIEndpointHandler<QueryStorageAPI> =>
  async ({ query, skip, limit }) => {
    return await storage.list().then(Object.fromEntries);
  };
