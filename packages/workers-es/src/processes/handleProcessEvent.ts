import { ProcessEventHandler, ProcessEventHandlers, processUserId } from "./processes";
import { findInObj, Logger } from "@project/essentials";
import { executeCommand } from "../commands/executeCommand";
import { Env } from "../env";
import { StoredEvent } from "../events/events";
import { System } from "../system/system";

interface Options {
  handlers: ProcessEventHandlers;
  logger: Logger;
  env: Env;
  event: StoredEvent;
  system: System;
}

export const handleProcessEvent = async ({ handlers, logger, env, event, system }: Options) => {
  const handler: ProcessEventHandler = findInObj(handlers, event.kind);
  if (!handler) return;

  logger.debug(`handling event '${event.kind}'`);

  await handler({
    event: event as any,
    effects: {
      executeCommand: async (command) =>
        executeCommand({
          env,
          command,
          userId: processUserId,
          system,
        }),
    },
  });
};
