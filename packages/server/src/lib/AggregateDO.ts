import { ensure, getInObj, api } from "@project/shared";
import { z } from "zod";
import { AggregateCommandHandlers } from "./commands";
import { AggregateReducer, AggregateReducers } from "./reducers";

export const AggregateExecuteInput = z.object({
  command: z.string(),
  payload: z.any().optional(),
});

export class AggreateDO<TState extends Record<string, any>> implements DurableObject {
  private initializePromise: Promise<void> | undefined;
  protected state: TState = {} as any;

  constructor(
    private objectState: DurableObjectState,
    private commands: AggregateCommandHandlers<TState>,
    private reducers: AggregateReducers<TState>
  ) {}

  async initialize(): Promise<void> {
    let stored = (await this.objectState.storage.get("state")) as TState | undefined;
    this.state = stored || ({} as any);
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

    if (request.url != `execute`) throw new Error(`can only support 'execute' right now`);

    const input = AggregateExecuteInput.parse(await request.json());

    console.log(`execution starting`, { input, state: this.state });

    const event = getInObj(this.commands, input.command)(this.state, { payload: input.payload });

    console.log(`execution finished`, event);

    const reducedState = getInObj(this.reducers, event.kind)(this.state, {
      aggregateId: ensure(this.objectState.id.toString()),
      payload: event.payload,
    });

    console.log(`state reduced`, reducedState);

    this.state = reducedState;
    await this.objectState.storage.put("state", reducedState);

    console.log(`state stored`);

    console.log(`adding event to event store`);

    return new Response(
      JSON.stringify({
        kind: `success`,
      })
    );
  }
}
