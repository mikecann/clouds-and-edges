import { nullLogger } from "@project/essentials";
import { DurableObjectStorage, KVStorage, MemoryKVStorage } from "miniflare";
import { queryStorage, QueryStorageAPI, defaultLimit, maxLimit } from "./queryStorage";
import { APIEndpointHandler } from "../durableObjects/rpc";

const logger = nullLogger;
let storage: DurableObjectStorage;
let handler: APIEndpointHandler<QueryStorageAPI>;

beforeEach(() => {
  storage = new DurableObjectStorage(new MemoryKVStorage());
  handler = queryStorage({ logger, storage });
});

it(`returns nothing when there is nothing in the storage`, async () => {
  await expect(handler({})).resolves.toEqual({});
});

it(`returns stuff is it is in the storage`, async () => {
  await storage.put(`foo`, `bar`);
  await storage.put(`moo`, 123);
  await storage.put(`doo`, { a: "b" });
  await expect(handler({})).resolves.toEqual({ foo: "bar", moo: 123, doo: { a: "b" } });
});

it(`can have its results limited`, async () => {
  await storage.put(`a`, 1);
  await expect(handler({ limit: 2 })).resolves.toEqual({ a: 1 });

  await storage.put(`b`, 2);
  await expect(handler({ limit: 2 })).resolves.toEqual({ a: 1, b: 2 });

  await storage.put(`c`, 3);
  await expect(handler({ limit: 2 })).resolves.toEqual({ a: 1, b: 2 });
});

it(`defaults to a limit of ${defaultLimit}`, async () => {
  for (let i = 0; i < defaultLimit + 10; i++) await storage.put(`${i}`, i);
  const result = Object.keys(await handler({})).length;
  expect(result).toBe(defaultLimit);
});

it(`has a max limit limit of ${maxLimit}`, async () => {
  for (let i = 0; i < maxLimit + 10; i++) await storage.put(`${i}`, i);
  const result = Object.keys(await handler({ limit: maxLimit * 2 })).length;
  expect(result).toBe(maxLimit);
});

it(`is able to return just a prefixed subset`, async () => {
  await storage.put(`mike`, 1);
  await storage.put(`foo`, 1);
  await storage.put(`mikeysee`, 1);
  await storage.put(`davemike`, 1);

  await expect(handler({ prefix: "mike" })).resolves.toEqual({ mike: 1, mikeysee: 1 });
});

it(`is able to return results from a stating key`, async () => {
  await storage.put(`apple`, 1);
  await storage.put(`dog`, 1);
  await storage.put(`mike`, 1);
  await storage.put(`bannana`, 1);

  await expect(handler({ start: "dog" })).resolves.toEqual({ dog: 1, mike: 1 });
});
