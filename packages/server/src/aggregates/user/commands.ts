import { UserAggregateState } from "./state";
import { UserEvent } from "./events";
import { AggregateCommandHandlers } from "@project/workers-es";
import { UserCommand } from "@project/shared";

export const commands: AggregateCommandHandlers<UserAggregateState, UserCommand, UserEvent> = {
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
