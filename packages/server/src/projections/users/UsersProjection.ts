import { findInObj } from "../../../../shared/src";
import { Events } from "../../events";
import { Event } from "../../lib/events";
import { ProjectionEventHandlers } from "../../lib/projections";
import { getDOOperation } from "../../utils";

interface ProjectionState {}

export class UsersProjection implements DurableObject {
  private initializePromise: Promise<void> | undefined;

  constructor(private objectState: DurableObjectState) {}

  async initialize(): Promise<void> {}

  private handlers: ProjectionEventHandlers<Events> = {
    "user-created": async ({ event: { aggregateId, payload } }) => {
      console.log(`UsersProjection user-created`, aggregateId, payload);
      await this.objectState.storage.put(`user:${aggregateId}`, {
        id: aggregateId,
        name: (payload as any).name,
      });
      console.log(`UsersProjection stored`);
    },
  };

  private async handle(event: Event) {
    console.log(`UsersProjection handling event`, event);
    const handler = findInObj(this.handlers, event.kind);
    if (!handler) {
      console.log(`projection unable to handle event '${event.kind}'`);
      return;
    }
    await handler({ event });
  }

  private async query(query: any) {
    console.log(`handling query`, query);
    const val = await this.objectState.storage.get(`user:${query.userId}`);
    console.log(`lookup response`, val);
    return val;
  }

  // Handle HTTP requests from clients.
  async fetch(request: Request) {
    // First init from storage
    if (!this.initializePromise) {
      this.initializePromise = this.initialize().catch(err => {
        this.initializePromise = undefined;
        throw err;
      });
    }
    await this.initializePromise;

    console.log(`UsersProjection got request, '${request.url}'`);

    const operation = getDOOperation(request.url);

    if (operation == "onEvent") {
      const event = await request.json();
      await this.handle(event);
      return new Response(
        JSON.stringify({
          kind: `success`,
        })
      );
    } else if (operation == "query") {
      const query = await request.json();
      console.log(`performing query`, query);
      return new Response(
        JSON.stringify({
          kind: `success`,
          payload: await this.query(query),
        })
      );
    } else throw new Error(`Unknown request '${request.url}'`);
  }
}
