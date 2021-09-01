import { Command, EventInput, StoredEvent } from "@project/workers-es";

export interface ProcessAdminState {
  status: `not-built` | `building` | `built`;
}

type ProcessSideEffects<TCommands extends Command> = {
  executeCommand: (command: TCommands) => Promise<unknown>;
};

type Storage = DurableObjectStorage;

export type ProcessEventHandler<
  TEvents extends EventInput = EventInput,
  TCommands extends Command = Command,
  TStorage extends Storage = Storage,
  TSideEffects extends Record<string, Function> = Record<string, Function>,
  P extends TEvents["kind"] = TEvents["kind"]
> = (context: {
  event: StoredEvent<Extract<TEvents, { kind: P }>>;
  effects: ProcessSideEffects<TCommands> & TSideEffects;
  storage: TStorage;
}) => Promise<void> | void;

export type ProcessEventHandlers<
  TEvents extends EventInput = EventInput,
  TCommands extends Command = Command,
  TStorage extends Storage = Storage,
  TSideEffects extends Record<string, Function> = Record<string, Function>
> = {
  handlers: Partial<
    {
      [P in TEvents["kind"]]: ProcessEventHandler<TEvents, TCommands, TStorage, TSideEffects, P>;
    }
  >;

  effects: TSideEffects;
};

export const processUserId = `PROCESS_ADMIN`;
