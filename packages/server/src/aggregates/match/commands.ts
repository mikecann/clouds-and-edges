import { AggregateCommandHandlers } from "@project/workers-es";
import { MatchAggregateState } from "./state";
import { MatchCommand } from "@project/shared";
import { MatchEvent } from "./events";

export const commands: AggregateCommandHandlers<MatchAggregateState, MatchCommand, MatchEvent> = {
  create: (state, { payload: { settings, players }, userId, timestamp }) => {
    if (state.createdAt) throw new Error(`match already created`);
    return {
      kind: `match-created`,
      payload: {
        players,
        settings,
      },
    };
  },
};
