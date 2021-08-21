import faker from "faker";
import { generateId } from "@project/essentials";
import { StoredEvent } from "@project/workers-es";

export const createFakeEvent = (): StoredEvent => ({
  id: generateId(),
  kind: "hello-world",
  aggregate: "SomeAggregate",
  timestamp: faker.date.past(1).getTime(),
  aggregateId: faker.random.uuid(),
  payload: faker.random.objectElement(),
});
