import { generateId, getLogger } from "@project/essentials";
import { AggreateDurableObject } from "../aggregates/AggreateDurableObject";
import { createDurableObjectRPCProxy } from "../durableObjects/createDurableObjectRPCProxy";

interface Options {
  namespace: DurableObjectNamespace;
  aggregate: string;
  env: any;
  aggregateId?: string;
  command: string;
  payload: unknown;
  userId: string;
}

const logger = getLogger(`executeCommand`);

export const executeCommand = async ({
  env,
  namespace,
  aggregate,
  aggregateId = generateId(),
  command,
  userId,
  payload,
}: Options) => {
  logger.debug(`Executing command`, {
    aggregate,
    aggregateId,
    env,
    payload,
    command,
    userId,
  });

  return createDurableObjectRPCProxy(
    AggreateDurableObject,
    namespace.get(namespace.idFromString(aggregateId))
  ).execute({ command, payload, userId });
};
