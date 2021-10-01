import { UserAggregateState } from "./state";
import { UserEvent } from "./events";
import { AggregateCommandHandlers } from "@project/workers-es";
import { UserCommands } from "@project/shared";
import { emojis, randomOne, someNiceColors } from "@project/essentials";

export const commands: AggregateCommandHandlers<UserAggregateState, UserCommands, UserEvent> = {
  create: ({ state, payload }) => {
    if (state.createdAt) throw new Error(`user already created`);
    return {
      kind: `user-created`,
      payload: {
        name: payload.name,
        avatar: randomOne(emojis),
        color: randomOne(someNiceColors),
      },
    };
  },
  "set-name": ({ state, payload }) => {
    if (!state.createdAt) throw new Error(`user not created`);
    return {
      kind: `user-name-set`,
      payload: {
        name: payload.name,
      },
    };
  },
  "create-match-request": ({ state, payload, userId }) => {
    if (!state.createdAt) throw new Error(`user not created`);
    return {
      kind: `user-create-match-requested`,
      payload: {
        size: payload.size,
        userId,
      },
    };
  },
};
