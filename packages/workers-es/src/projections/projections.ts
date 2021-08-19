import { Event } from "../events/Event";
import { z } from "zod";

type Kindable = { kind: string };

export type ProjectionEventHandlers<TEvents extends Kindable> = Partial<
  {
    [P in TEvents["kind"]]: (
      context: { event: Event } // <Extract<TEvents, { kind: P }>>
    ) => Promise<void> | void;
  }
>;

export const ProjectionAdminState = z.object({
  status: z.union([z.literal("not-built"), z.literal("building"), z.literal("built")]),
});

export type ProjectionAdminState = z.infer<typeof ProjectionAdminState>;
