import { iterateEventStore } from "../events/iterateEventStore";
import { ReadModelAdminStatus } from "./readModels";
import { BaseEventStore } from "../events/BaseEventStore";
import { StoredEvent } from "../events/events";

interface Options {
  untilEvent?: string;
  setBuildStatus: (status: ReadModelAdminStatus) => Promise<unknown>;
  store: BaseEventStore;
  storage: DurableObjectStorage;
  eventHandler: (event: StoredEvent) => Promise<unknown>;
}

export const build = async ({
  setBuildStatus,
  untilEvent,
  eventHandler,
  store,
  storage,
}: Options) => {
  // First we update the status so other events cant come in
  await setBuildStatus("building");

  // First empty all the storage
  await storage.deleteAll();

  // Then iterate over all the events in the store
  await iterateEventStore({
    store,
    cb: eventHandler,
    untilEvent,
  });

  // Finally reset the status so events can come back in
  await setBuildStatus("built");
};
