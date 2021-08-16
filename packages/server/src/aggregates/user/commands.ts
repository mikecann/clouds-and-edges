import { AggregateCommandHandlers } from "../../lib/commands";
import { UserAggregateState } from "./state";
import { UserCommands } from "@project/shared";
import { UserEvents } from "./events";

export const commands: AggregateCommandHandlers<UserAggregateState, UserCommands, UserEvents> = {
  create: (state, { payload: { name } }) => {
    if (state.createdAt) throw new Error(`user already created`);
    return {
      kind: `user-created`,
      payload: {
        name,
      },
    };
  },
  "set-name": (state, { payload: { name } }) => {
    if (!state.createdAt) throw new Error(`User not created`);
    return {
      kind: `user-name-set`,
      payload: {
        name,
      },
    };
  },
};
