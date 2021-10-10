import { BaseEventStore } from "./BaseEventStore";
import { DurableObjectStorage, MemoryKVStorage } from "miniflare";
import { DurableObjectId, DurableObjectState } from "miniflare/dist/modules/do";
import { iterateEventStore } from "./iterateEventStore";
import { StoredEvent } from "./events";

let store: BaseEventStore;

const getEvent = (aggregateId: string) => ({
  aggregate: "user",
  kind: "foo",
  aggregateId,
  payload: {
    a: 123,
  },
  timestamp: 456,
});

const getResults = async (batchSize?: number) => {
  let events: StoredEvent[] = [];
  await iterateEventStore({
    store,
    batchSize,
    cb: (e) => events.push(e),
  });
  return events;
};

beforeEach(() => {
  const storage = new DurableObjectStorage(new MemoryKVStorage());
  store = new BaseEventStore(new DurableObjectState(new DurableObjectId(""), storage), {}, {
    getReadModels: () => [],
  } as any);
});

it(`works for one event`, async () => {
  await store.addEvent(getEvent(`123`));

  const results = await getResults();

  expect(results.length).toBe(1);
  expect(results[0].id).toBe(`e:000000000`);
  expect(results[0].aggregateId).toBe(`123`);
});

it(`works for multiple events in the same batch`, async () => {
  await store.addEvent(getEvent(`111`));
  await store.addEvent(getEvent(`222`));
  await store.addEvent(getEvent(`333`));

  const results = await getResults();

  expect(results.map((r) => r.aggregateId)).toEqual([`111`, `222`, `333`]);
});

it(`can handle multiple batches`, async () => {
  await store.addEvent(getEvent(`111`));
  await store.addEvent(getEvent(`222`));
  await store.addEvent(getEvent(`333`));
  await store.addEvent(getEvent(`444`));
  await store.addEvent(getEvent(`555`));

  const results = await getResults(2);

  expect(results.map((r) => r.aggregateId)).toEqual([`111`, `222`, `333`, `444`, `555`]);
});
