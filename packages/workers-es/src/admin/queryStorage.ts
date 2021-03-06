import { APIEndpointHandler } from "../durableObjects/rpc";
import { Logger } from "@project/essentials";

interface Options {
  storage: DurableObjectStorage;
  logger: Logger;
}

type JSONType = string | boolean | Record<string, unknown> | null | undefined;

export interface QueryStorageAPI {
  input: {
    /**
     * What the key should start with
     */
    prefix?: string;

    /**
     * The max number of results to return, defaults to 100 and has a max of 100
     */
    limit?: number;

    /**
     * The key from which to start from
     */
    start?: string;

    /**
     * Should reverse the results or not
     */
    reverse?: boolean;
  };
  output: Record<string, JSONType>;
}

export const defaultLimit = 100;
export const maxLimit = 100;

export const queryStorage =
  ({ storage, logger }: Options): APIEndpointHandler<QueryStorageAPI> =>
  async ({ prefix, start, limit = defaultLimit, reverse = false }) => {
    limit = Math.min(limit, maxLimit);
    return await storage.list({ limit, prefix, start, reverse }).then(Object.fromEntries);
  };
