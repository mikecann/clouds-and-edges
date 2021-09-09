import { commands } from "./commands";
import { reducers } from "./reducers";
import { Env } from "../../env";
import { AggreateDurableObject } from "@project/workers-es";
import { system } from "../../system";
import { MatchAggregateState } from "./state";

export class MatchAggregate extends AggreateDurableObject<MatchAggregateState, Env> {
  constructor(objectState: DurableObjectState, env: Env) {
    super(objectState, env, system, "match", commands, reducers);
  }
}
