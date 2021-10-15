import { Command } from "../commands/commands";
import { CommandExecutionResponse } from "../aggregates/AggreateDurableObject";
import { EventInput, StoredEvent } from "../events/events";

export type ProcessSideEffects<TCommands extends Command> = {
  executeCommand: (
    command: TCommands & { aggregateId?: string }
  ) => Promise<CommandExecutionResponse | undefined>;
};

export type UserSideEffect = (...args: any[]) => unknown;
export type UserSideEffects = Record<string, UserSideEffect>;

type Storage = DurableObjectStorage;

export type ProcessEventHandler<
  TEvents extends EventInput = EventInput,
  TCommands extends Command = Command,
  TStorage extends Storage = Storage,
  TSideEffects extends UserSideEffects = UserSideEffects,
  P extends TEvents["kind"] = TEvents["kind"]
> = (context: {
  event: StoredEvent<Extract<TEvents, { kind: P }>>;
  effects: ProcessSideEffects<TCommands> & TSideEffects;
}) => Promise<void> | void;

export type ProcessEventHandlers<
  TEvents extends EventInput = EventInput,
  TCommands extends Command = Command,
  TStorage extends Storage = Storage,
  TSideEffects extends UserSideEffects = UserSideEffects
> = {
  handlers: Partial<{
    [P in TEvents["kind"]]: ProcessEventHandler<TEvents, TCommands, TStorage, TSideEffects, P>;
  }>;

  effects: TSideEffects;
};

export const processUserId = `PROCESS_ADMIN`;
