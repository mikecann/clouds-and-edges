import { Env } from "../../env";
import { Projections } from "@project/shared";
import { RPCApiHandler, RPCHandler, ProjectionDurableObject } from "@project/workers-es";
import { getHandlers } from "./eventHandlers";
import { system } from "../../system";
import { createMatchesProjectionRepo, MatchesProjectionRepo } from "./createMatchesProjectionRepo";

type API = Projections["matches"];

export class MatchesProjection extends ProjectionDurableObject<Env> implements RPCApiHandler<API> {
  private repo: MatchesProjectionRepo;

  constructor(objectState: DurableObjectState, env: Env) {
    super(
      objectState,
      getHandlers(createMatchesProjectionRepo(objectState.storage)),
      env,
      system,
      "match"
    );

    this.repo = createMatchesProjectionRepo(objectState.storage);
  }

  getMatches: RPCHandler<API, "getMatches"> = async ({ userId }) => {
    return await this.repo.getUserMatches(userId);
  };

  getMatch: RPCHandler<API, "getMatch"> = async ({ id }) => {
    return await this.repo.get(id);
  };
}
