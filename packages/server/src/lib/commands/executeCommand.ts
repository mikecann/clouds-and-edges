import { AggregateNames, getInObj } from "@project/shared";
import { aggregates } from "../../aggregates/aggregates";
import { Env } from "../../env";
import { AggreateDO } from "../aggregates/AggregateDO";
import { callDurableObject } from "../durableObjects/callDurableObject";

interface Options {
  aggregate: AggregateNames;
  env: Env;
  aggregateId?: string;
  command: string;
  payload: unknown;
}

export const executeCommand = async ({
  env,
  aggregate,
  aggregateId,
  command,
  payload,
}: Options) => {
  const stub: DurableObjectNamespace = getInObj(env, getInObj(aggregates, aggregate));

  const objId = aggregateId ? stub.idFromString(aggregateId) : stub.newUniqueId();

  console.log(`Executing command`, {
    aggregate,
    aggregateId,
    env,
    payload,
    command,
  });

  return callDurableObject({
    stub: stub.get(objId),
    object: AggreateDO,
    endpoint: "execute",
    input: {
      command,
      payload,
    },
  });
};
