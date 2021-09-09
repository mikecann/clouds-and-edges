import { commands } from "./commands";
import { reducers } from "./reducers";
import { Env } from "../../env";
import { AggreateDurableObject } from "@project/workers-es";
import { system } from "../../system";

export class UserAggregate extends AggreateDurableObject {
  constructor(objectState: DurableObjectState, env: Env) {
    super(objectState, env, system, "user", commands, reducers);
  }
}
