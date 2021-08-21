import { ProposalCommand } from "@project/shared";
import { AggregateCommandHandlers } from "@project/workers-es";
import { ProposalEvent } from "./events";
import { ProposalAggregateState } from "./state";

const validateActionableStateState = (state: ProposalAggregateState) => {
  if (state.joinedAt) throw new Error(`proposal already matchmade`);
  if (state.rejectedAt) throw new Error(`proposal already rejected`);
  if (state.cancelledAt) throw new Error(`proposal already cancelled`);
};

export const commands: AggregateCommandHandlers<
  ProposalAggregateState,
  ProposalCommand,
  ProposalEvent
> = {
  create: (state, { payload: { settings } }) => {
    if (state.createdAt) throw new Error(`proposal already created`);
    validateActionableStateState(state);
    return {
      kind: `proposal-created`,
      payload: {
        settings,
      },
    };
  },
  "reject-create": (state, { payload: { reason } }) => {
    validateActionableStateState(state);
    return {
      kind: `proposal-creation-rejected`,
      payload: {
        reason,
      },
    };
  },
  cancel: (state, { payload: {} }) => {
    validateActionableStateState(state);
    return {
      kind: `proposal-cancelled`,
      payload: {},
    };
  },
  join: (state, { userId, payload: {} }) => {
    validateActionableStateState(state);
    return {
      kind: `proposal-joined`,
      payload: { userId },
    };
  },
};
