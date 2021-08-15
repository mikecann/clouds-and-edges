export interface CreateCommand {
  kind: `create`;
  aggregate: `user`,
  name: string;
}

export interface SetNameCommand {
  kind: `set-name`;
  aggregate: `user`,
  name: string;
}

export type UserCommands = CreateCommand | SetNameCommand;