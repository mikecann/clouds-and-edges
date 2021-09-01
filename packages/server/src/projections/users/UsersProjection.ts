import { Env } from "../../env";
import { Projections, UserProjection } from "@project/shared";
import { RPCApiHandler, RPCHandler, ProjectionDurableObject } from "@project/workers-es";
import { getHandlers } from "./eventHandlers";
import { system } from "../../system";

type API = Projections["users"];

export class UsersProjection extends ProjectionDurableObject<Env> implements RPCApiHandler<API> {
  constructor(objectState: DurableObjectState, env: Env) {
    super(objectState, getHandlers(objectState.storage), env, system, "user");
  }

  findUserById: RPCHandler<API, "findUserById"> = async ({ id }) => {
    this.logger.debug(`handling query`, id);
    const all = await this.storage.list();
    this.logger.debug(`ALLLLLL`, all);
    const val = await this.storage.get(`user:${id}`);
    this.logger.debug(`lookup response`, val);
    return {
      user: val ? (val as UserProjection) : null,
    };
  };
}
