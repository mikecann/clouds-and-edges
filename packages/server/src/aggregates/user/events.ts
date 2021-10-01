import { CreateMatchSize } from "@project/shared";

export interface UserCreated {
  kind: "user-created";
  payload: {
    name: string;
    avatar: string;
  };
}

export interface UserNameSet {
  kind: "user-name-set";
  payload: {
    name: string;
  };
}

export interface UserCreateMatchRequested {
  kind: "user-create-match-requested";
  payload: {
    userId: string;
    size: CreateMatchSize;
  };
}

export type UserEvent = UserCreated | UserNameSet | UserCreateMatchRequested;
