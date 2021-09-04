import { APIEndpointHandler } from "../durableObjects/rpc";
import { Logger } from "@project/essentials";

interface Options {
  logger: Logger;
}

export interface GetStorageSchemaAPI {
  input: {};
  output: Record<string, string>;
}

export const getStorageSchema =
  ({ logger }: Options): APIEndpointHandler<GetStorageSchemaAPI> =>
  async ({}) => {
    return {};
  };
