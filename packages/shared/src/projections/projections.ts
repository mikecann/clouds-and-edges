import { Id } from "../modal/id";

export interface UserProjection {
  id: Id;
  name: string;
}

export type Projections = {
  users: {
    findUserById: {
      input: {
        id: string;
      };
      output: {
        user?: UserProjection | null;
      };
    };
  };
};

export type ProjectionKinds = keyof Projections;
