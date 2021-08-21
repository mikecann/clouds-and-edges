import { RPCDurableObject } from "../durableObjects/RPCDurableObject";
import { getLogger } from "@project/essentials";
import { Event } from "./Event";
import { RPCApiHandler, RPCHandler } from "../durableObjects/rpc";

const logger = getLogger(`EventStore`);

const getEventId = (aggregate: string, aggregateId: string, index: number) =>
  `e:${aggregate}:${aggregateId}:${index}`;

export type BaseEventStoreAPI = {
  addEvent: {
    input: {
      aggregate: string;
      aggregateId: string;
      kind: string;
      payload: unknown;
    };
    output: {
      eventId: string;
    };
  };
  getEvents: {
    input: {
      aggregate?: string;
    };
    output: {
      events: Event[];
    };
  };
};

type API = BaseEventStoreAPI;

export class BaseEventStore<TEnv> extends RPCDurableObject<TEnv> implements RPCApiHandler<API> {
  private eventIndex: number = 0;

  protected storage: DurableObjectStorage;

  constructor(protected objectState: DurableObjectState, protected env: TEnv) {
    super();
    this.storage = objectState.storage;
  }

  protected onEventAdded = (event: Event): any => {};

  async init() {
    this.eventIndex = (await this.storage.get("eventIndex")) ?? 0;
  }

  addEvent: RPCHandler<API, "addEvent"> = async ({ aggregate, aggregateId, kind, payload }) => {
    const id = getEventId(aggregate, aggregateId, this.eventIndex);

    const event: Event = {
      id,
      kind,
      aggregate,
      aggregateId,
      createdAt: Date.now(), // not 100% sure how date now works in a DO, hopefully UTC will be okay everywhere
      payload,
    };

    logger.debug(`adding event`, event);

    // I think we need a better eventId here
    await this.storage.put(`eventIndex`, this.eventIndex++);
    await this.storage.put(id, event);

    // We now need to inform all projection and processes about the event but we dont
    // want to wait for them to finish as they could take a while.
    // I hope this is how it works in DOs
    await this.onEventAdded(event);

    return {
      eventId: id,
    };
  };

  getEvents: RPCHandler<API, "getEvents"> = async ({ aggregate }) => {
    const prefix = `e:${aggregate ? `${aggregate}:` : ``}`;
    this.logger.debug(`getting events with prefix '${prefix}'`);
    const contents = await this.storage.list({
      limit: 100,
      prefix,
    });
    const events: Event[] = [...contents.values()] as any;
    return { events };
  };
}
