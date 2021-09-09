import { AggregateCommandHandlers } from "@project/workers-es";
import { MatchAggregateState } from "./state";
import { MatchCommand } from "@project/shared";
import { MatchEvent } from "./events";

export const commands: AggregateCommandHandlers<MatchAggregateState, MatchCommand, MatchEvent> = {
  create: (state, { payload: { settings }, userId, timestamp }) => {
    if (state.createdAt) throw new Error(`match already created`);
    return {
      kind: `match-created`,
      payload: {
        createdByUserId: userId,
        settings,
      },
    };
  },
  join: (state, { payload: {}, userId, timestamp }) => {
    return {
      kind: `match-joined`,
      payload: {},
    };
  },
  cancel: (state, { payload: {}, userId, timestamp }) => {
    return {
      kind: `match-cancelled`,
      payload: {},
    };
  },
};
