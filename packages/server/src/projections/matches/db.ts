import { Id, MatchProjection } from "@project/shared";
import { createSimpleDb } from "@project/workers-es";

type Entities = {
  match: MatchProjection;
  open: {
    id: Id;
  };
  player: {
    id: Id;
    matches: Id[];
  }
};

export const createDb = (storage: DurableObjectStorage) => createSimpleDb<Entities>({ storage });

export type Db = ReturnType<typeof createDb>;
