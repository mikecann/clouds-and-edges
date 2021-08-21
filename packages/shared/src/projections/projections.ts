import { Id } from "../modal/id";
import { ProjectionAdminState } from "@project/workers-es";

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
  proposals: {
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
