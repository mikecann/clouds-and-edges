import { RpcRoutesApi } from "../addRpcRoutes";
import { getLogger } from "@project/essentials";

interface Options {
  stub: DurableObjectStub;
  object: any;
  endpoint: any;
  input: any; //Parameters<TObject[TEndpoint]>;
}

const logger = getLogger(`callDurableObject`);

export const callDurableObject = async ({
  stub,
  object,
  endpoint,
  input,
}: Options): Promise<unknown> => {
  logger.debug(`calling durable object '${object.name}'`, {
    stub,
    endpoint,
    input,
  });

  const response = await stub.fetch(`https://fake-host/${endpoint}`, {
    method: "POST",
    body: JSON.stringify(input),
  });

  if (!response.ok) throw new Error(`Calling durable object failed ${response}`);

  const payload = await response.json();

  logger.debug(`durable object response`, payload);

  return payload;
};
