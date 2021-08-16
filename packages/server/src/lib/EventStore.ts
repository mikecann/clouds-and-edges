import { AggregateNames, generateId } from "@project/shared";
import { Env } from "../env";
import { Event, AddEventInput } from "./events";

const getStoreKey = (eventId: string, aggregate: AggregateNames, aggregateId: string) =>
  `e:${aggregate}:${aggregateId}:${eventId}`;

export class EventStore implements DurableObject {
  private initializePromise: Promise<void> | undefined;

  constructor(private objectState: DurableObjectState, private env: Env) {}

  async initialize(): Promise<void> {}

  // Handle HTTP requests from clients.
  async fetch(request: Request) {
    // First init from storage
    if (!this.initializePromise) {
      this.initializePromise = this.initialize().catch(err => {
        this.initializePromise = undefined;
        throw err;
      });
    }
    await this.initializePromise;

    if (request.url != "add") throw new Error(`only know how to add right now`);

    const req: AddEventRequest = await request.json();

    const eventId = generateId();

    const key = getStoreKey(eventId, req.aggregate, req.aggregateId);

    const event: Event = {
      kind: req.input.kind,
      aggregate: req.aggregate,
      aggregateId: req.aggregateId,
      createdAt: Date.now(), // not 100% sure how date now works in a DO, hopefully UTC will be okay everywhere
      payload: req.input.payload,
    };

    console.log(`adding event`, event);

    // I think we need a better eventId here
    await this.objectState.storage.put(key, event);

    // We now need to inform all projection and processes about the event but we dont
    // want to wait for them to finish as they could take a while.
    // I hope this is how it works in DOs
    this.env.UsersProjection.get(`v1`).fetch("onEvent", {
      method: "POST",
      body: JSON.stringify(event),
    });

    return new Response(
      JSON.stringify({
        kind: `success`,
      })
    );
  }
}

export const getEventStore = (env: Env) => env.EventStore.get(`v1`);

export interface AddEventRequest {
  aggregate: AggregateNames;
  aggregateId: string;
  input: AddEventInput;
}
