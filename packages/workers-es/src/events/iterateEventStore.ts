import { BaseEventStore } from "./BaseEventStore";
import { StoredEvent } from "./events";
import { getNextEventId } from "./ids";

interface Options {
  store: BaseEventStore;
  cb: (event: StoredEvent) => Promise<unknown> | unknown;
  batchSize?: number;
  untilEvent?: string;
}

export const iterateEventStore = async ({ cb, store, untilEvent, batchSize = 100 }: Options) => {
  // Remember the index to go from
  let fromEventId: string | undefined;

  while (true) {
    // Lets grab a fresh batch of events
    const events: StoredEvent[] = (await store.getEvents({ limit: batchSize, fromEventId })).events;

    for (const event of events) {
      // We should stop once we reach this event
      if (event.id == untilEvent) return;

      // Let the callback handle the event
      await cb(event);
    }

    // If there are less events in the batch than the batch size then there are no more event
    // and we should finish.
    if (events.length < batchSize) return;

    // For the next batch of events we want to go from the next index
    fromEventId = getNextEventId(events[events.length - 1].id);
  }
};
