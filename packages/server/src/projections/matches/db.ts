import { createSimpleDb } from "@project/workers-es";
import { MatchesProjection } from "src/main";

type Entities = {
  match: MatchesProjection;
  ref: {
    id: string;
  };
};

export const createDb = (storage: DurableObjectStorage) => createSimpleDb<Entities>({ storage });

export type Db = ReturnType<typeof createDb>;
