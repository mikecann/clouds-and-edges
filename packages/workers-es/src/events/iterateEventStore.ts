import { BaseEventStore } from "./BaseEventStore";
import { StoredEvent } from "./events";

interface Options {
  store: BaseEventStore;
  cb: (event: StoredEvent) => Promise<unknown> | unknown;
}

export const iterateEventStore = async ({ cb, store }: Options) => {
  let fromEventId: string | undefined = undefined;

  while (true) {
    const events: StoredEvent[] = (await store.getEvents({ fromEventId })).events;
    if (events.length == 0) break;
    for (let event of events) await cb(event);
    fromEventId = events[events.length - 1].id;
  }
};
