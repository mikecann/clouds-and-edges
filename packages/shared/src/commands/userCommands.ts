export interface CreateUserCommand {
  kind: `create-user`;
  name: string;
}

export interface SetUserNameCommand {
  kind: `set-user-name`;
  name: string;
}

export type UserCommands = CreateUserCommand | SetUserNameCommand;
