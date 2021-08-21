import { getInObj, getLogger } from "@project/essentials";

export abstract class RPCDurableObject<TEnv> implements DurableObject {
  protected logger = getLogger(`${this.constructor.name}`);
  protected initPromise: Promise<any> | undefined = undefined;

  protected constructor() {}

  protected async init() {}

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

    const url = new URL(request.url);

    const endpoint = url.pathname.substring(1);
    const payload = await request.json();

    this.logger.debug(`executing '${endpoint}'`, payload);

    const handler = getInObj(this, endpoint);
    const output = await handler.bind(this)(payload);

    this.logger.debug(`returning`, output);

    return new Response(JSON.stringify(output));
  }
}
