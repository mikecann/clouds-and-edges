interface Create {
  kind: `create`;
  aggregate: `user`;
  payload: {
    name: string;
  };
}

interface SetName {
  kind: `set-name`;
  aggregate: `user`;
  payload: {
    name: string;
  };
}

export type UserCommands = Create | SetName;
