import { Env } from "./env";
import { BaseEventStore, StoredEvent } from "@project/workers-es";
import { system } from "./system";

export class EventStore extends BaseEventStore<Env> {
  onEventAdded = async (event: StoredEvent) => {
    await system.getProjection("users", this.env).onEvent({ event });
    await system.getProjection("matches", this.env).onEvent({ event });

    await system.getProcess("matchCreation", this.env).onEvent({ event });
    await system.getProcess("matchJoining", this.env).onEvent({ event });
  };
}

export const getEventStore = (env: Env) => env.EventStore.get(env.EventStore.idFromName(`1`));
