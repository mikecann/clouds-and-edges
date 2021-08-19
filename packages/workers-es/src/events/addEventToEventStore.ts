import { BaseEventStore } from "./BaseEventStore";
import { AddEventInput } from "./events";
import { callDurableObject } from "../durableObjects/callDurableObject";

interface Options {
  env: any;
  event: AddEventInput;
  aggregate: string;
  aggregateId: string;
}

export const addEventToEventStore = async ({ env, event, aggregate, aggregateId }: Options) => {
  return await callDurableObject({
    stub: env.EventStore.get(env.EventStore.idFromName(BaseEventStore.version)),
    object: BaseEventStore,
    endpoint: "addEvent",
    input: { aggregate, aggregateId, kind: event.kind, payload: event.payload },
  });
};
