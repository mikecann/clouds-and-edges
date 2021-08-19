import { RpcRoutesHandlers, RpcRoutesApi } from "../addRpcRoutes";
import { getInObj, getLogger } from "@project/essentials";

export abstract class RPCDurableObject<TRoutesApi extends RpcRoutesApi, TEnv>
  implements DurableObject
{
  private initPromise: Promise<void> | undefined;
  protected logger = getLogger(`${this.constructor.name}`);

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

    const parts = request.url.split("/");
    const endpoint = parts[parts.length - 1];
    const payload = await request.json();

    this.logger.debug(`got RPCRequest`, { endpoint, payload });

    return new Response(JSON.stringify(await getInObj(this.routes, endpoint)(payload)));
  }
}
