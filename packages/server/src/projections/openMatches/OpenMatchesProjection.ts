import { Env } from "../../env";
import { Projections } from "@project/shared";
import { RPCApiHandler, RPCHandler, ProjectionDurableObject } from "@project/workers-es";
import { getHandlers } from "./eventHandlers";
import { system } from "../../system";
import {
  createOpenMatchesProjection,
  OpenMatchesProjectionRepo,
} from "./createOpenMatchesProjection";

type API = Projections["openMatches"];

export class OpenMatchesProjection
  extends ProjectionDurableObject<Env>
  implements RPCApiHandler<API>
{
  private repo: OpenMatchesProjectionRepo;

  constructor(objectState: DurableObjectState, env: Env) {
    super(
      objectState,
      getHandlers(createOpenMatchesProjection(objectState.storage)),
      env,
      system,
      "match"
    );

    this.repo = createOpenMatchesProjection(objectState.storage);
  }

  getOpenMatches: RPCHandler<API, "getOpenMatches"> = async ({}) => {
    return await this.repo.list();
  };
}
