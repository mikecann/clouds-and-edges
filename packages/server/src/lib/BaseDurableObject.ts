import { Env } from "../env";
import { Router } from "itty-router";
import { router } from "../routes";
import { addRpcRoutes, RpcRoutesHandlers } from "./addRpcRoutes";

export abstract class BaseDurableObject implements DurableObject {
  private initializePromise: Promise<void> | undefined;
  private router: Router<unknown>;

  constructor(private env: Env, routes: RpcRoutesHandlers<any>) {
    this.router = Router();
    addRpcRoutes({ routes, urlPrefix: `/`, router: this.router });
    // 404 for everything else
    router.all("*", () => new Response("Not Found.", { status: 404 }));
  }

  abstract initialize(): Promise<void>;

  // Handle HTTP requests from clients.
  async fetch(request: Request): Promise<Response> {
    // First init from storage
    if (!this.initializePromise) {
      this.initializePromise = this.initialize().catch(err => {
        this.initializePromise = undefined;
        throw err;
      });
    }
    await this.initializePromise;

    return this.router.handle(request, this.env);
  }
}
