import { AggregateNames, getInObj } from "@project/shared";
import { aggregates } from "../aggregates/aggregates";
import { AggregateExecuteInput } from "./AggregateDO";
import { Env } from "../env";

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

  const objId = aggregateId ? aggregateId : stub.newUniqueId();

  console.log(`Executing command`, {
    aggregate,
    aggregateId,
    env,
    payload,
    command,
  });

  const response = await stub
    .get(objId)
    .fetch(`execute`, {
      method: "POST",
      body: JSON.stringify(
        AggregateExecuteInput.parse({
          payload: payload,
          command: command,
        })
      ),
    })
    .then(r => r.json());

  console.log(`command response`, response);

  return response;
};
