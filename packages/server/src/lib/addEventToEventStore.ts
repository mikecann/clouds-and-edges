import { Env } from "../env";
import { AddEventRequest, getEventStore } from "./EventStore";
import { AddEventInput } from "./events";
import { AggregateNames } from "@project/shared";

interface Options {
  env: Env;
  event: AddEventInput;
  aggregate: AggregateNames;
  aggregateId: string;
}

export const addEventToEventStore = async ({ env, event, aggregate, aggregateId }: Options) => {
  const stub = getEventStore(env);

  console.log(`adding event`, {
    event,
  });

  const request: AddEventRequest = {
    aggregate,
    aggregateId,
    input: event,
  };

  const response = await stub
    .fetch(`add`, {
      method: "POST",
      body: JSON.stringify(request),
    })
    .then(r => r.json());

  console.log(`event store response`, response);

  return response;
};
