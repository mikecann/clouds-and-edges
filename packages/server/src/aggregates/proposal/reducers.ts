import { ProposalAggregateState } from "./state";
import { AggregateReducers } from "@project/workers-es";
import { ProposalEvent } from "./events";

export const reducers: AggregateReducers<ProposalAggregateState, ProposalEvent> = {
  "proposal-created": (
    state,
    { aggregateId, timestamp, payload: { settings, createdByUserId } }
  ) => ({
    ...state,
    id: aggregateId,
    createdAt: timestamp,
    createdByUserId,
    settings,
  }),
  "proposal-cancelled": (state, { aggregateId, timestamp, payload: {} }) => ({
    ...state,
    cancelledAt: timestamp,
  }),
  "proposal-creation-rejected": (state, { aggregateId, timestamp, payload: {} }) => ({
    ...state,
    rejectedAt: timestamp,
  }),
  "proposal-joined": (state, { aggregateId, timestamp, payload: {} }) => ({
    ...state,
    joinedAt: timestamp,
  }),
  "proposal-matchmade": (state, { aggregateId, timestamp, payload: {} }) => ({
    ...state,
    matchmadeAt: timestamp,
  }),
};
