import { Router } from "itty-router";
import { addRpcRoutes, RpcRoutesHandlers, RpcRoutesApi } from "../addRpcRoutes";

export abstract class RPCDurableObject<TRoutesApi extends RpcRoutesApi> implements DurableObject {
  private initializePromise: Promise<void> | undefined;
  private router: Router<unknown>;

  constructor(
    private options: {
      env: any;
      init: () => Promise<void>;
      routes: RpcRoutesHandlers<TRoutesApi, unknown>;
    }
  ) {
    this.router = Router();
    addRpcRoutes<TRoutesApi, unknown>({
      routes: options.routes,
      urlPrefix: `/`,
      router: this.router,
    });
    // 404 for everything else
    this.router.all("*", () => new Response("Not Found.", { status: 404 }));
  }

  // Handle HTTP requests from clients.
  async fetch(request: Request): Promise<Response> {
    // First init from storage
    if (!this.initializePromise) {
      this.initializePromise = this.options.init().catch((err) => {
        this.initializePromise = undefined;
        throw err;
      });
    }
    await this.initializePromise;

    return this.router.handle(request, this.options.env);
  }
}
