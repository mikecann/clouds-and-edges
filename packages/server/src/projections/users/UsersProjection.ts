import { Env } from "../../env";
import { Projections, UserProjection } from "@project/shared";
import { RPCApiHandler, RPCHandler, ProjectionDurableObject } from "@project/workers-es";
import { getHandlers } from "./eventHandlers";

type API = Projections["users"];

export class UsersProjection extends ProjectionDurableObject<Env> implements RPCApiHandler<API> {
  static version = `1.0.0`;

  constructor(objectState: DurableObjectState, env: Env) {
    super(objectState, env, getHandlers(objectState.storage));
  }

  findUserById: RPCHandler<API, "findUserById"> = async ({ id }) => {
    this.logger.debug(`handling query`, id);
    const val = await this.storage.get(`user:${id}`);
    this.logger.debug(`lookup response`, val);
    return {
      user: val ? (val as UserProjection) : null,
    };
  };
}
