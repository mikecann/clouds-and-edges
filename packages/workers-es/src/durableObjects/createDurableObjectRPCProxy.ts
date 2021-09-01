import { getLogger } from "@project/essentials";

const logger = getLogger(`RPCProxy`);

export const createDurableObjectRPCProxy = <TObject extends abstract new (...args: any) => any>(
  obj: TObject,
  stub: DurableObjectStub
) => {
  return new Proxy<Omit<InstanceType<TObject>, "env" | "init" | "fetch">>({} as any, {
    get: function (target, prop) {
      return async function () {
        const endpoint = prop as string;
        const input = arguments[0];

        logger.debug(`calling durable object '${obj.name}'`, {
          stub,
          endpoint,
          input,
        });

        const response = await stub.fetch(`https://${stub.id}/${endpoint}`, {
          method: "POST",
          body: JSON.stringify(input),
        });

        if (!response.ok) throw new Error(`Calling durable object failed ${response}`);

        const payload = await response.json();

        logger.debug(`[${endpoint}] response`, payload);

        return payload;
      };
    },
  });
};
