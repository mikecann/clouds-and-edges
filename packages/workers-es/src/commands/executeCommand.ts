import { generateId, getLogger } from "@project/essentials";
import { AggreateDurableObject } from "../aggregates/AggreateDurableObject";
import { createDurableObjectRPCProxy } from "../durableObjects/createDurableObjectRPCProxy";
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
    env,
    command,
    userId,
    system,
  });

  const stub = system.getAggregateStub(command.aggregate, env, command.aggregateId ?? generateId());

  return createDurableObjectRPCProxy(AggreateDurableObject, stub).execute({
    command: command.kind,
    payload: command.payload,
    userId,
  });
};
