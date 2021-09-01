import { getLogger, iife } from "@project/essentials";
import { Env } from "../env";
import { Command } from "./commands";
import { System } from "../system/system";

interface Options {
  command: Command;
  userId: string;
  env: Env;
  system: System;
}

const logger = getLogger(`executeCommand`);

export const executeCommand = async ({ env, command, userId, system }: Options) => {
  logger.debug(`Executing command`, {
    command,
    userId,
  });

  const aggregateId = iife(() => {
    if (command.aggregateId) return command.aggregateId;
    const namespaceName = system.getAggregateNamespaceName(command.aggregate);
    const namespace = system.getNamespace(namespaceName, env);
    return namespace.newUniqueId().toString();
  });

  return system.getAggregate(command.aggregate, env, aggregateId).execute({
    command: command.kind,
    payload: command.payload,
    userId,
  });
};
