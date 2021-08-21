import { BaseEventStore } from "./BaseEventStore";
import { AddEventInput } from "./events";
import { createDurableObjectRPCProxy } from "../durableObjects/createDurableObjectRPCProxy";

interface Options {
  env: any;
  event: AddEventInput;
  aggregate: string;
  aggregateId: string;
}

export const addEventToEventStore = async ({ env, event, aggregate, aggregateId }: Options) => {
  const stub = env.EventStore.get(env.EventStore.idFromName(`1`));
  return await createDurableObjectRPCProxy(BaseEventStore, stub).addEvent({
    aggregate,
    aggregateId,
    kind: event.kind,
    payload: event.payload,
  });
};
