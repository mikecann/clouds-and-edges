import { Event } from "@project/shared";
import faker from "faker";
import { generateId } from "@project/essentials";

export const createFakeEvent = (): Event => ({
  id: generateId(),
  kind: "hello-world",
  aggregate: "SomeAggregate",
  createdAt: faker.date.past(1).getTime(),
  aggregateId: faker.random.uuid(),
  payload: faker.random.objectElement(),
});
