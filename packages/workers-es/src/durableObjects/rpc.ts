export type RPCApi = Record<string, { input: unknown; output: unknown }>;

export type RPCHandler<TApi extends RPCApi, TEndpoint extends keyof TApi> = (
  input: TApi[TEndpoint]["input"]
) => Promise<TApi[TEndpoint]["output"]> | TApi[TEndpoint]["output"];

export type RPCApiHandler<TApi extends RPCApi> = {
  [P in keyof TApi]: RPCHandler<TApi, P>;
};
