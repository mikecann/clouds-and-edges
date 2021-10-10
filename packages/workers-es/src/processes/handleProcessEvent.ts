import {
  ProcessEventHandler,
  ProcessEventHandlers,
  ProcessSideEffects,
  processUserId,
  UserSideEffects,
} from "./processes";
import { findInObj, Logger } from "@project/essentials";
import { executeCommand } from "../commands/executeCommand";
import { Env } from "../env";
import { StoredEvent } from "../events/events";
import { System } from "../system/system";
import { Command } from "../commands/commands";

interface Options {
  handlers: ProcessEventHandlers;
  logger: Logger;
  env: Env;
  event: StoredEvent;
  system: System;
  canExecuteSideEffects: boolean;
}

export const handleProcessEvent = async ({
  handlers,
  logger,
  env,
  event,
  system,
  canExecuteSideEffects,
}: Options) => {
  const handler: ProcessEventHandler = findInObj(handlers.handlers, event.kind);
  if (!handler) return;

  logger.debug(`handling event '${event.kind}'`);

  await handler({
    event: event as any,
    effects: canExecuteSideEffects
      ? {
          executeCommand: async (command) =>
            executeCommand({
              env,
              command,
              userId: processUserId,
              system,
            }),
          ...handlers.effects,
        }
      : (getNullEffects(handlers.effects) as any),
  });
};

const getNullEffects = (
  userEffects: UserSideEffects
): ProcessSideEffects<Command> & UserSideEffects => ({
  executeCommand: async () => {
    return undefined;
  },
  ...Object.keys(userEffects).reduce(
    (accum, curr) => ({ ...accum, [curr]: async () => undefined }),
    {}
  ),
});
