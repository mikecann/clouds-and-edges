import { getInObj } from "@project/shared";
import { commands } from "./commands";
import { reducers } from "./reducer";
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
    // Make sure we're fully initialized from storage.
    if (!this.initializePromise) {
      // if (this.initializePromise === null) {
      this.initializePromise = this.initialize().catch(err => {
        // If anything throws during initialization then we need to be
        // sure sure that a future request will retry initialize().
        // Note that the concurrency involved in resetting this shared
        // promise on an error can be tricky to get right -- we don't
        // recommend customizing it.
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
      aggregateId: "5555",
      payload: event.payload,
    });

    console.log(`UserAggregate reducedState`, reducedState);

    this.state = reducedState;
    await this.objectState.storage.put("state", reducedState);

    console.log(`UserAggregate stored state`);

    return new Response(`hello world`);

    /*
    // Apply requested action.
    let url = new URL(request.url);

    console.log(`UserAggregate got`, url);

    let currentValue = this.value;
    switch (url.pathname) {
      case "/increment":
        currentValue = ++this.value;
        await this.state.storage.put("value", this.value);
        break;
      case "/addTwo":
        this.value += 2;
        currentValue = this.value;
        await this.state.storage.put("value", this.value);
        break;
      case "/decrement":
        currentValue = --this.value;
        await this.state.storage.put("value", this.value);
        break;
      case "/":
        // Just serve the current value. No storage calls needed!
        break;
      default:
        return new Response("Not found", { status: 404 });
    }

    // Return `currentValue`. Note that `this.value` may have been
    // incremented or decremented by a concurrent request when we
    // yielded the event loop to `await` the `storage.put` above!
    // That's why we stored the counter value created by this
    // request in `currentValue` before we used `await`.
    return new Response(`${currentValue}`);
    */
  }
}
