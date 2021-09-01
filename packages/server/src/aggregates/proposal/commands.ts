import { ProposalCommand } from "@project/shared";
import { AggregateCommandHandlers } from "@project/workers-es";
import { ProposalEvent } from "./events";
import { ProposalAggregateState } from "./state";
import { matchLiteral } from "variant";

/*
  Todo: this might be better as a state machine using xstate or something simmilar..
 */
export const commands: AggregateCommandHandlers<
  ProposalAggregateState,
  ProposalCommand,
  ProposalEvent
> = {
  create: (state, { payload: { size }, userId }) => {
    if (state.createdAt) throw new Error(`proposal already created`);
    if (state.joinedAt) throw new Error(`proposal already joined`);
    if (state.rejectedAt) throw new Error(`proposal already rejected`);
    if (state.cancelledAt) throw new Error(`proposal already cancelled`);
    if (state.matchmadeAt) throw new Error(`proposal already matchmade`);

    return {
      kind: `proposal-created`,
      payload: {
        createdByUserId: userId,
        settings: {
          gridSize: matchLiteral(size, {
            small: () => ({ width: 3, height: 3 }),
            medium: () => ({ width: 5, height: 5 }),
            large: () => ({ width: 7, height: 7 }),
          }),
        },
      },
    };
  },
  "reject-create": (state, { payload: { reason } }) => {
    if (state.joinedAt) throw new Error(`proposal already joined`);
    if (state.rejectedAt) throw new Error(`proposal already rejected`);
    if (state.cancelledAt) throw new Error(`proposal already cancelled`);
    if (state.matchmadeAt) throw new Error(`proposal already matchmade`);

    return {
      kind: `proposal-creation-rejected`,
      payload: {
        reason,
      },
    };
  },
  cancel: (state, { payload: {}, userId }) => {
    if (state.joinedAt) throw new Error(`proposal already joined`);
    if (state.rejectedAt) throw new Error(`proposal already rejected`);
    if (state.cancelledAt) throw new Error(`proposal already cancelled`);
    if (state.matchmadeAt) throw new Error(`proposal already matchmade`);

    if (state.createdByUserId != userId) throw new Error(`Cannot cancel someone elses proposal`);

    return {
      kind: `proposal-cancelled`,
      payload: {},
    };
  },
  join: (state, { userId, payload: {} }) => {
    if (state.joinedAt) throw new Error(`proposal already joined`);
    if (state.rejectedAt) throw new Error(`proposal already rejected`);
    if (state.cancelledAt) throw new Error(`proposal already cancelled`);
    if (state.matchmadeAt) throw new Error(`proposal already matchmade`);

    if (state.createdByUserId == userId) throw new Error(`Cannot join your own proposal`);

    return {
      kind: `proposal-joined`,
      payload: { userId },
    };
  },
  matchmake: (state, { userId, payload: {} }) => {
    if (!state.joinedAt) throw new Error(`proposal must have been joined`);
    if (state.rejectedAt) throw new Error(`proposal already rejected`);
    if (state.cancelledAt) throw new Error(`proposal already cancelled`);
    if (state.matchmadeAt) throw new Error(`proposal already matchmade`);

    if (state.createdByUserId == userId) throw new Error(`Cannot join your own proposal`);

    return {
      kind: `proposal-joined`,
      payload: { userId },
    };
  },
};
