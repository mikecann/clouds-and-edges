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
    this.logger.debug(`handling query`, userId);
    const contents = await this.repo.getUserMatches(userId);
    return [...contents.values()];
  };
}
