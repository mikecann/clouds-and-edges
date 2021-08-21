import { ProjectionDurableObject } from "./ProjectionDurableObject";
import { DurableObjectStorage, MemoryKVStorage } from "miniflare";

let storage = new DurableObjectStorage(new MemoryKVStorage());
let obj: ProjectionDurableObject;

const createObj = () => {
  const objState: DurableObjectState = {
    storage,
    id: {
      name: "",
      toString: () => "",
    },
  } as any;

  return new ProjectionDurableObject(objState, {}, {} as any, "user");
};

beforeEach(() => {
  storage = new DurableObjectStorage(new MemoryKVStorage());
  obj = createObj();
});

it(`works`, () => {});
