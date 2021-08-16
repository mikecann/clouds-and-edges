import { commands } from "./commands";
import { reducers } from "./reducers";
import { UserAggregateState } from "./state";
import { AggreateDO } from "../../lib/AggregateDO";
import { Env } from "../../env";

export class UserAggregate extends AggreateDO<UserAggregateState> {
  constructor(objectState: DurableObjectState, env: Env) {
    super(objectState, env, "user", commands as any, reducers as any);
  }
}
