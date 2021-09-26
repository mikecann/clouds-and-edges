import { UserAggregateState } from "./state";
import { UserEvent } from "./events";
import { AggregateCommandHandlers } from "@project/workers-es";
import { UserCommands } from "@project/shared";
import { emojis, ensure, randomOne, someNiceColors } from "@project/essentials";

export const commands: AggregateCommandHandlers<UserAggregateState, UserCommands, UserEvent> = {
  create: ({ state, payload }) => {
    ensure(state.createdAt, `user not created`);
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
    ensure(state.createdAt, `user not created`);
    return {
      kind: `user-name-set`,
      payload: {
        name: payload.name,
      },
    };
  },
  "create-match-request": ({ state, payload, userId }) => {
    ensure(state.createdAt, `user not created`);
    return {
      kind: `user-create-match-requested`,
      payload: {
        size: payload.size,
        userId,
      },
    };
  },
};
