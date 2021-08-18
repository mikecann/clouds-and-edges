import { Event } from "@project/shared";

type Kindable = { kind: string };

export type ProjectionEventHandlers<TEvents extends Kindable> = Partial<
  {
    [P in TEvents["kind"]]: (
      context: { event: Event } // <Extract<TEvents, { kind: P }>>
    ) => Promise<void> | void;
  }
>;
