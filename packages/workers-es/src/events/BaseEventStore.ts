import { getLogger, leftFillNum } from "@project/essentials";
import { RPCApiHandler, RPCHandler } from "../durableObjects/rpc";
import { StoredEvent } from "./events";
import { Env } from "../env";
import { InspectableStorageDurableObject } from "../admin/InspectableStorageDurableObject";
import { System } from "../system/system";
import { getEventId } from "./ids";

const logger = getLogger(`EventStore`);

export type BaseEventStoreAPI = {
  addEvent: {
    input: {
      aggregate: string;
      aggregateId: string;
      kind: string;
      payload: unknown;
      timestamp: number;
    };
    output: {
      eventId: string;
    };
  };
  getEvents: {
    input: {
      fromEventId?: string;
      limit?: number;
    };
    output: {
      events: StoredEvent[];
    };
  };
};

type API = BaseEventStoreAPI;

export class BaseEventStore<TEnv extends Env = Env>
  extends InspectableStorageDurableObject<TEnv>
  implements RPCApiHandler<API>
{
  private eventIndex: number = 0;

  protected storage: DurableObjectStorage;

  constructor(
    protected objectState: DurableObjectState,
    protected env: TEnv,
    protected system: System
  ) {
    super(objectState);
    this.storage = objectState.storage;
  }

  async init() {
    this.eventIndex = (await this.storage.get("eventIndex")) ?? 0;
  }

  addEvent: RPCHandler<API, "addEvent"> = async ({
    aggregate,
    aggregateId,
    kind,
    payload,
    timestamp,
  }) => {
    const id = getEventId(this.eventIndex);

    const event: StoredEvent = {
      id,
      kind,
      aggregate,
      aggregateId,
      payload,
      timestamp,
    };

    logger.debug(`adding event`, event);

    // I think we need a better eventId here
    await this.storage.put(`eventIndex`, ++this.eventIndex);
    await this.storage.put(id, event);

    // We now need to inform all read models about the event
    for (const model of this.system.getReadModels(this.env)) await model.onEvent({ event });

    return {
      eventId: id,
    };
  };

  getEvents: RPCHandler<API, "getEvents"> = async ({ fromEventId, limit = 100 }) => {
    const contents = await this.storage.list({
      limit,
      start: fromEventId,
      prefix: `e:`,
    });
    const events: StoredEvent[] = [...contents.values()] as any;
    return { events };
  };
}
