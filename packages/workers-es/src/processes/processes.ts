import { Command, CommandExecutionResponse, EventInput, StoredEvent } from "@project/workers-es";

type ProcessSideEffects<TCommands extends Command> = {
  executeCommand: (
    command: TCommands & { aggregateId?: string }
  ) => Promise<CommandExecutionResponse>;
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
}) => Promise<void> | void;

export type ProcessEventHandlers<
  TEvents extends EventInput = EventInput,
  TCommands extends Command = Command,
  TStorage extends Storage = Storage,
  TSideEffects extends Record<string, Function> = Record<string, Function>
> = {
  handlers: Partial<{
    [P in TEvents["kind"]]: ProcessEventHandler<TEvents, TCommands, TStorage, TSideEffects, P>;
  }>;

  effects: TSideEffects;
};

export const processUserId = `PROCESS_ADMIN`;
