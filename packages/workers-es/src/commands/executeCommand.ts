import { AggreateDO } from "../aggregates/AggregateDO";
import { callDurableObject } from "../durableObjects/callDurableObject";
import { generateId, getLogger } from "@project/essentials";

interface Options {
  namespace: DurableObjectNamespace;
  aggregate: string;
  env: any;
  aggregateId?: string;
  command: string;
  payload: unknown;
}

const logger = getLogger(`executeCommand`);

export const executeCommand = async ({
  env,
  namespace,
  aggregate,
  aggregateId = generateId(),
  command,
  payload,
}: Options) => {
  logger.debug(`Executing command`, {
    aggregate,
    aggregateId,
    env,
    payload,
    command,
  });

  return callDurableObject({
    stub: namespace.get(namespace.idFromName(aggregateId)),
    object: AggreateDO,
    endpoint: "execute",
    input: {
      command,
      payload,
    },
  });
};
