import { z } from "zod";
import { RpcRoutesApi } from "../addRpcRoutes";
import { getLogger } from "@project/essentials";

interface Options<TApi extends RpcRoutesApi, TEndpoint extends keyof TApi> {
  stub: DurableObjectStub;
  object: {
    api: TApi;
    name: string;
  };
  endpoint: TEndpoint;
  input: z.infer<TApi[TEndpoint]["input"]>;
}

const logger = getLogger(`callDurableObject`);

export const callDurableObject = async <TApi extends RpcRoutesApi, TEndpoint extends keyof TApi>({
  stub,
  object,
  endpoint,
  input,
}: Options<TApi, TEndpoint>): Promise<z.infer<TApi[TEndpoint]["output"]>> => {
  logger.debug(`calling durable object '${object.name}'`, {
    stub,
    endpoint,
    input,
  });

  const response = await stub
    .fetch(`https://fake-host/${endpoint}`, {
      method: "POST",
      body: JSON.stringify(input),
    })
    .then((r) => r.json());

  logger.debug(`durable object response`, response);

  return response;
};
