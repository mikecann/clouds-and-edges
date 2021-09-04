export type APIEndpoint = { input: unknown; output: unknown };
export type RPCApi = Record<string, APIEndpoint>;

export type RPCHandler<TApi extends RPCApi, TEndpoint extends keyof TApi> = (
  input: TApi[TEndpoint]["input"]
) => Promise<TApi[TEndpoint]["output"]> | TApi[TEndpoint]["output"];

export type APIEndpointHandler<TEndpointApi extends APIEndpoint> = (
  input: TEndpointApi["input"]
) => Promise<TEndpointApi["output"]> | TEndpointApi["output"];

export type RPCApiHandler<TApi extends RPCApi> = {
  [P in keyof TApi]: RPCHandler<TApi, P>;
};
