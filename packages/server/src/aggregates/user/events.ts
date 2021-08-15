export interface UserCreated {
  kind: "user-created";
  payload: {
    name: string;
  };
}

export interface UserNameSet {
  kind: "user-name-set";
  payload: {
    name: string;
  };
}

export type UserEvents = UserCreated | UserNameSet;