import { ensure, getInObj } from "@project/shared";
import { commands } from "./commands";
import { reducers } from "./reducers";
import { UserAggregateState } from "./state";

export class UserAggregate implements DurableObject {
  initializePromise: Promise<void> | undefined;
  objectState: DurableObjectState;
  state: UserAggregateState = {};

  constructor(state: DurableObjectState, env: any) {
    this.objectState = state;
  }

  async initialize(): Promise<void> {
    let stored = (await this.objectState.storage.get("state")) as UserAggregateState | undefined;
    this.state = stored || {};
  }

  // Handle HTTP requests from clients.
  async fetch(request: Request) {

    // First init from storage
    if (!this.initializePromise) {
      this.initializePromise = this.initialize().catch(err => {
        this.initializePromise = undefined;
        throw err;
      });
    }
    await this.initializePromise;

    const command = request.url;
    const payload = await request.json();

    console.log(`UserAggregate Starting`, { command, payload, state: this.state });

    const event = getInObj(commands, command)(this.state, { payload });

    console.log(`UserAggregate created event`, event);

    const reducedState = getInObj(reducers, event.kind)(this.state, {
      aggregateId: ensure(this.state.id),
      payload: event.payload,
    });

    console.log(`UserAggregate reducedState`, reducedState);

    this.state = reducedState;
    await this.objectState.storage.put("state", reducedState);

    console.log(`UserAggregate stored state`);

    return new Response(`hello world`);
  }
}
