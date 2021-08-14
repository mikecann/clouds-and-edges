import { UserAggregateState } from "./state";

type EventKind = string;
type EventPayload = unknown;

type AggregateCommandHandler<TState, TPayload> = (
  state: TState,
  context: { payload: TPayload }
) => {
  kind: EventKind;
  payload: EventPayload;
};

interface Commands {
  create: AggregateCommandHandler<UserAggregateState, { name: string }>;
}

export const commands: Commands = {
  create: (state, { payload: { name } }) => {
    if (state.createdAt) throw new Error(`user already created`);
    return {
      kind: `user-created`,
      payload: {
        name,
      },
    };
  },
};
