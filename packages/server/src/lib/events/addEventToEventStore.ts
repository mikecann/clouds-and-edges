import { Env } from "../../env";
import { EventStore } from "./EventStore";
import { AddEventInput } from "./events";
import { AggregateNames } from "@project/shared";
import { callDurableObject } from "../durableObjects/callDurableObject";

interface Options {
  env: Env;
  event: AddEventInput;
  aggregate: AggregateNames;
  aggregateId: string;
}

export const addEventToEventStore = async ({ env, event, aggregate, aggregateId }: Options) => {
  return await callDurableObject({
    stub: env.EventStore.get(env.EventStore.idFromName(EventStore.version)),
    object: EventStore,
    endpoint: "add",
    input: { aggregate, aggregateId, kind: event.kind, payload: event.payload },
  });
};
