import { Env } from "./env";
import { BaseEventStore, callDurableObject, Event } from "@project/workers-es";
import { UsersProjection } from "./main";

export class EventStore extends BaseEventStore<Env> {
  onEventAdded = async (event: Event) => {
    await callDurableObject({
      stub: this.env.UsersProjection.get(
        this.env.UsersProjection.idFromName(UsersProjection.version)
      ),
      object: UsersProjection,
      endpoint: "onEvent",
      input: { event },
    });
  };
}
