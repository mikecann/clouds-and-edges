import { Env } from "./env";
import { BaseEventStore, StoredEvent } from "@project/workers-es";
import { UsersProjection } from "./main";
import { createDurableObjectRPCProxy } from "@project/workers-es";

export class EventStore extends BaseEventStore<Env> {
  onEventAdded = async (event: StoredEvent) => {
    await createDurableObjectRPCProxy(
      UsersProjection,
      this.env.UsersProjection.get(this.env.UsersProjection.idFromName(`1`))
    ).onEvent({ event });
  };
}
