import { CreateMatchSize } from "../match/match";

interface Base {
  aggregate: `user`;
}

interface Create extends Base {
  kind: `create`;
  payload: {
    name: string;
  };
}

interface SetName extends Base {
  kind: `set-name`;
  payload: {
    name: string;
  };
}

interface CreateMatchRequest extends Base {
  kind: `create-match-request`;
  payload: {
    size: CreateMatchSize;
  };
}

export type UserCommands = Create | SetName | CreateMatchRequest;
