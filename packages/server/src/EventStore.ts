import { Env } from "./env";
import { BaseEventStore, StoredEvent } from "@project/workers-es";
import { MatchesProjection, ProposalJoiningProcess, UsersProjection } from "./main";
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

    await createDurableObjectRPCProxy(
      MatchesProjection,
      this.env.MatchesProjection.get(this.env.MatchesProjection.idFromName(`1`))
    ).onEvent({ event });

    await createDurableObjectRPCProxy(
      ProposalJoiningProcess,
      this.env.ProposalJoiningProcess.get(this.env.ProposalJoiningProcess.idFromName(`1`))
    ).onEvent({ event });
  };
}

export const getEventStore = (env: Env) => env.EventStore.get(env.EventStore.idFromName(`1`));
