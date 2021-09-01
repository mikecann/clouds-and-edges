import { EventInput, StoredEvent } from "../events/events";

export type ProjectionEventHandlers<TEvents extends EventInput> = Partial<
  {
    [P in TEvents["kind"]]: (context: {
      event: StoredEvent<Extract<TEvents, { kind: P }>>;
    }) => Promise<void> | void;
  }
>;

export interface ProjectionAdminState {
  status: `not-built` | `building` | `built`;
}
