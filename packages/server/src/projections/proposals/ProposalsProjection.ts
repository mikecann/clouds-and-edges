import { Env } from "../../env";
import { Projections, ProposalProjection } from "@project/shared";
import { RPCApiHandler, RPCHandler, ProjectionDurableObject } from "@project/workers-es";
import { getHandlers } from "./eventHandlers";
import { system } from "../../system";

type API = Projections["proposals"];

export class ProposalsProjection
  extends ProjectionDurableObject<Env>
  implements RPCApiHandler<API>
{
  constructor(objectState: DurableObjectState, env: Env) {
    super(objectState, getHandlers(objectState.storage), env, system, "proposal");
  }

  getProposals: RPCHandler<API, "getProposals"> = async ({ userId }) => {
    this.logger.debug(`handling query`, userId);
    const contents = await this.storage.list<ProposalProjection>({
      prefix: `proposal:`,
      limit: 10,
    });
    this.logger.debug(`lookup response`, contents);
    return { proposals: [...contents.values()] };
  };
}
