import { RPCDurableObject } from "../durableObjects/RPCDurableObject";
import { getLogger } from "@project/essentials";
import { RPCApiHandler, RPCHandler } from "../durableObjects/rpc";
import { Env } from "../env";
import { queryStorage, QueryStorageAPI } from "./queryStorage";
import { getStorageSchema, GetStorageSchemaAPI } from "./getStorageSchema";

export type InspectableStorageDurableObjectAPI = {
  getStorageSchema: GetStorageSchemaAPI;
  queryStorage: QueryStorageAPI;
};

type API = InspectableStorageDurableObjectAPI;

export class InspectableStorageDurableObject<TEnv = Env>
  extends RPCDurableObject<TEnv>
  implements RPCApiHandler<API>
{
  queryStorage: RPCHandler<API, "queryStorage">;
  getStorageSchema: RPCHandler<API, "getStorageSchema">;

  constructor(protected objectState: DurableObjectState) {
    super();

    const storage = objectState.storage;
    const logger = getLogger(`${this.constructor.name}`);

    this.queryStorage = queryStorage({ storage, logger });
    this.getStorageSchema = getStorageSchema({ logger });
  }
}
