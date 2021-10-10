import { Env } from "../env";
import { BaseEventStore } from "@project/workers-es";
import { system } from "../system";

export class EventStore extends BaseEventStore<Env> {
  constructor(objectState: DurableObjectState, env: Env) {
    super(objectState, env, system);
  }
}
