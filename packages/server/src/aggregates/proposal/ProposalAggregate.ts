import { commands } from "./commands";
import { reducers } from "./reducers";
import { ProposalAggregateState } from "./state";
import { Env } from "../../env";
import { AggreateDurableObject } from "@project/workers-es";

export class ProposalAggregate extends AggreateDurableObject<ProposalAggregateState, Env> {
  constructor(objectState: DurableObjectState, env: Env) {
    super(objectState, env, "proposal", commands as any, reducers as any);
  }
}
