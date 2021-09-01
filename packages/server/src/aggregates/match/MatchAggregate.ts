import { commands } from "./commands";
import { reducers } from "./reducers";
import { Env } from "../../env";
import { AggreateDurableObject } from "@project/workers-es";
import { MatchAggregateState } from "./state";
import { system } from "../../system";

export class MatchAggregate extends AggreateDurableObject<MatchAggregateState, Env> {
  constructor(objectState: DurableObjectState, env: Env) {
    super(objectState, env, system, "match", commands as any, reducers as any);
  }
}
