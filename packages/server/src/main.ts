import { Env } from "./env";
import { router } from "./routes";

export { UserAggregate } from "./aggregates/user/UserAggregate";
export { ProposalAggregate } from "./aggregates/proposal/ProposalAggregate";
export { MatchAggregate } from "./aggregates/match/MatchAggregate";

export { UsersProjection } from "./projections/users/UsersProjection";
export { ProposalsProjection } from "./projections/proposals/ProposalsProjection";
export { MatchesProjection } from "./projections/matches/MatchesProjection";

export { ProposalJoiningProcess } from "./processes/proposalJoining/ProposalJoiningProcess";

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
      console.error(`main fetch caught error`, e);
      const errorMessage = e instanceof Error ? e.message : e + "";
      const response = new Response(errorMessage, {
        status: 500,
      });
      response.headers.set("Access-Control-Allow-Origin", "*");
      return response;
    }
  },
};
