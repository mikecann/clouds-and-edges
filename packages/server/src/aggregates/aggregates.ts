import { Env } from "../env";
import { AggregateKinds } from "@project/shared";

export const aggregates: Record<AggregateKinds, keyof Env> = {
  user: `UserAggregate`,
  proposal: `ProposalAggregate`,
  match: `MatchAggregate`,
};
