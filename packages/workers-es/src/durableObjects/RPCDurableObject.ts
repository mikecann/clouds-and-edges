import { RpcRoutesHandlers, RpcRoutesApi } from "../addRpcRoutes";
import { RPCRequest } from "./rpc";
import { getInObj, getLogger } from "@project/essentials";

export abstract class RPCDurableObject<TRoutesApi extends RpcRoutesApi, TEnv>
  implements DurableObject
{
  private initPromise: Promise<void> | undefined;
  protected logger = getLogger(`${this}`);

  constructor(
    protected env: TEnv,
    protected init: () => Promise<void> = async () => {},
    protected routes: RpcRoutesHandlers<TRoutesApi, unknown>
  ) {}

  // Handle HTTP requests from clients.
  async fetch(request: Request): Promise<Response> {
    // First init from storage
    if (!this.initPromise) {
      this.initPromise = this.init().catch((err) => {
        this.initPromise = undefined;
        throw err;
      });
    }
    await this.initPromise;

    const rpcRequest: RPCRequest = await request.json();
    this.logger.debug(`got RPCRequest`, rpcRequest);

    getInObj(this.routes, rpcRequest.endpoint)(rpcRequest.payload);

    return new Response("okay");

    //return this.router.handle(request, this.options.env);
  }
}
