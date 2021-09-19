import { Id } from "../modal/id";

export interface UserProjection {
  id: Id;
  name: string;
}

export interface UsersProjections {
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
}
