import { commands } from "./commands";
import { reducers } from "./reducers";
import { UserAggregateState } from "./state";
import { Env } from "../../env";
import { AggreateDurableObject } from "@project/workers-es";
import { system } from "../../system";

export class UserAggregate extends AggreateDurableObject<UserAggregateState, Env> {
  constructor(objectState: DurableObjectState, env: Env) {
    super(objectState, env, system, "user", commands as any, reducers as any);
  }
}
