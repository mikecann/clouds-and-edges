import { Env } from "../../env";
import { Router } from "itty-router";
import { router } from "../../routes";
import { addRpcRoutes, RpcRoutesHandlers, RpcRoutesApi } from "../addRpcRoutes";

export abstract class BaseDurableObject<TRoutesApi extends RpcRoutesApi> implements DurableObject {
  private initializePromise: Promise<void> | undefined;
  private router: Router<unknown>;

  constructor(
    private options: {
      env: Env;
      init: () => Promise<void>;
      routes: RpcRoutesHandlers<TRoutesApi>;
    }
  ) {
    this.router = Router();
    addRpcRoutes<TRoutesApi>({ routes: options.routes, urlPrefix: `/`, router: this.router });
    // 404 for everything else
    router.all("*", () => new Response("Not Found.", { status: 404 }));
  }

  // Handle HTTP requests from clients.
  async fetch(request: Request): Promise<Response> {
    // First init from storage
    if (!this.initializePromise) {
      this.initializePromise = this.options.init().catch(err => {
        this.initializePromise = undefined;
        throw err;
      });
    }
    await this.initializePromise;

    return this.router.handle(request, this.options.env);
  }
}
