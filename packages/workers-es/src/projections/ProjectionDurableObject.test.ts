import { ProjectionDurableObject } from "./ProjectionDurableObject";
import { DurableObjectStorage, MemoryKVStorage } from "miniflare";
import { DurableObjectId, DurableObjectState } from "miniflare/dist/modules/do";

let storage = new DurableObjectStorage(new MemoryKVStorage());
let obj: ProjectionDurableObject;

const createObj = () => {
  return new ProjectionDurableObject(
    new DurableObjectState(new DurableObjectId(""), storage),
    {},
    {} as any,
    "user"
  );
};

beforeEach(() => {
  storage = new DurableObjectStorage(new MemoryKVStorage());
  obj = createObj();
});

it(`works`, () => {});
