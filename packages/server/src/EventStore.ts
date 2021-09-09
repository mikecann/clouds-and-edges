import { Env } from "./env";
import { BaseEventStore, StoredEvent } from "@project/workers-es";
import { system } from "./system";

export class EventStore extends BaseEventStore<Env> {
  onEventAdded = async (event: StoredEvent) => {
    await system.getProjection("users", this.env).onEvent({ event });
    await system.getProjection("matches", this.env).onEvent({ event });
    await system.getProjection("openMatches", this.env).onEvent({ event });

    await system.getProcess("proposalJoining", this.env).onEvent({ event });
  };
}

export const getEventStore = (env: Env) => env.EventStore.get(env.EventStore.idFromName(`1`));
