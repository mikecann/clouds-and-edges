import { RPCDurableObject } from "../durableObjects/RPCDurableObject";
import { getLogger } from "@project/essentials";
import { RPCApiHandler, RPCHandler } from "../durableObjects/rpc";
import { Env } from "../env";
import { queryStorage, QueryStorageAPI } from "./queryStorage";

export type InspectableStorageDurableObjectAPI = {
  queryStorage: QueryStorageAPI;
};

type API = InspectableStorageDurableObjectAPI;

export class InspectableStorageDurableObject<TEnv = Env>
  extends RPCDurableObject<TEnv>
  implements RPCApiHandler<API>
{
  queryStorage: RPCHandler<API, "queryStorage">;

  constructor(protected objectState: DurableObjectState) {
    super();

    const storage = objectState.storage;
    const logger = getLogger(`${this.constructor.name}`);

    this.queryStorage = queryStorage({ storage, logger });
  }
}
