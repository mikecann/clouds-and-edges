import { Env } from "./env";
import { BaseEventStore, StoredEvent } from "@project/workers-es";
import { UsersProjection } from "./main";
import { createDurableObjectRPCProxy } from "@project/workers-es";
import { ProposalsProjection } from "./projections/proposals/ProposalsProjection";

export class EventStore extends BaseEventStore<Env> {
  onEventAdded = async (event: StoredEvent) => {
    await createDurableObjectRPCProxy(
      UsersProjection,
      this.env.UsersProjection.get(this.env.UsersProjection.idFromName(`1`))
    ).onEvent({ event });

    await createDurableObjectRPCProxy(
      ProposalsProjection,
      this.env.ProposalsProjection.get(this.env.ProposalsProjection.idFromName(`1`))
    ).onEvent({ event });
  };
}

export const getEventStore = (env: Env) => env.EventStore.get(env.EventStore.idFromName(`1`));
