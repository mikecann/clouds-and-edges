import { Env } from "./env";
import { router } from "./routes";

// In order for the workers runtime to find the class that implements
// our Durable Object namespace, we must export it from the root module.
export { UserAggregate } from "./aggregates/user/UserAggregate";
export { ProposalAggregate } from "./aggregates/proposal/ProposalAggregate";
export { UsersProjection } from "./projections/users/UsersProjection";
export { EventStore } from "./EventStore";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      const response = await router.handle(request, env);
      if (response) {
        response.headers.set("Access-Control-Allow-Origin", "*");
        response.headers.set(`Access-Control-Allow-Headers`, "*");
      }
      return response;
    } catch (e) {
      console.error(`main fetch caught error`, e + "");
      const response = new Response(e.message);
      response.headers.set("Access-Control-Allow-Origin", "*");
      return response;
    }
  },
};
