import { Env } from "../../env";
import { ProcessDurableObject } from "@project/workers-es";
import { system } from "../../system";
import { getHandlers } from "./eventHandlers";
import { createDb } from "./db";

export class MatchCreationProcess extends ProcessDurableObject<Env> {
  constructor(objectState: DurableObjectState, env: any) {
    super(objectState, getHandlers(createDb(objectState.storage)) as any, env, system);
  }
}
