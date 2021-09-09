import { Env } from "../../env";
import { MatchProjection, Projections } from "@project/shared";
import { RPCApiHandler, RPCHandler, ProjectionDurableObject } from "@project/workers-es";
import { getHandlers } from "./eventHandlers";
import { system } from "../../system";
import { createMatchesProjectionRepo } from "./createMatchesProjectionRepo";

type API = Projections["matches"];

export class MatchesProjection extends ProjectionDurableObject<Env> implements RPCApiHandler<API> {
  constructor(objectState: DurableObjectState, env: Env) {
    super(
      objectState,
      getHandlers(createMatchesProjectionRepo(objectState.storage)),
      env,
      system,
      "match"
    );
  }

  getMatches: RPCHandler<API, "getMatches"> = async ({ userId }) => {
    this.logger.debug(`handling query`, userId);
    const contents = await this.storage.list<MatchProjection>({
      prefix: `match:`,
      limit: 10,
    });
    this.logger.debug(`lookup response`, contents);
    return [...contents.values()];
  };
}
