import { ensure, getInObj, AggregateNames } from "@project/shared";
import { z } from "zod";
import { AggregateCommandHandlers } from "./commands";
import { AggregateReducers } from "./reducers";
import { Env } from "../env";
import { addEventToEventStore } from "./addEventToEventStore";
import { AddEventInput } from "./events";
import {Router} from 'itty-router';
import {router} from '../routes';
import {getDOOperation} from '../utils';

export const AggregateExecuteInput = z.object({
  command: z.string(),
  payload: z.any().optional(),
});

export class AggreateDO<TState extends Record<string, any>> implements DurableObject {
  private initializePromise: Promise<void> | undefined;
  protected state: TState = {} as any;

  constructor(
    private objectState: DurableObjectState,
    private env: Env,
    private aggregate: AggregateNames,
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

    if (getDOOperation(request.url) != `execute`)
      throw new Error(
        `Request not supported '${request.url}', only 'execute' is currently supported`
      );

    const input = AggregateExecuteInput.parse(await request.json());

    console.log(`execution starting`, { input, id: this.objectState.id.toString() });

    const event: AddEventInput = getInObj(this.commands, input.command)(this.state, {
      payload: input.payload,
    });

    console.log(`execution finished`, event);

    const reducedState = getInObj(this.reducers, event.kind)(this.state, {
      aggregateId: this.objectState.id.toString(),
      payload: event.payload,
    });

    console.log(`state reduced`, reducedState);

    this.state = reducedState;
    await this.objectState.storage.put("state", reducedState);

    console.log(`state stored`);

    console.log(`adding event to event store`);

    await addEventToEventStore({
      env: this.env,
      event,
      aggregate: this.aggregate,
      aggregateId: this.objectState.id.toString(),
    });

    return new Response(
      JSON.stringify({
        kind: `success`,
      })
    );
  }
}
