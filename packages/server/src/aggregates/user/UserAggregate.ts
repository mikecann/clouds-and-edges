import { commands } from "./commands";
import { reducers } from "./reducers";
import { UserAggregateState } from "./state";
import { Env } from "../../env";
import { AggreateDO } from "@project/workers-es/dist";

export class UserAggregate extends AggreateDO<UserAggregateState, Env> {
  constructor(objectState: DurableObjectState, env: Env) {
    super(objectState, env, "user", commands as any, reducers as any);
  }
}
