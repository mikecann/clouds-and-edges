import { Env } from "../../env";
import { Projections, UserProjection } from "@project/shared";
import { RPCApiHandler, RPCHandler, ProjectionDurableObject } from "@project/workers-es";
import { getHandlers } from "./eventHandlers";
import { system } from "../../system";

type API = Projections["users"];

export class UsersProjection extends ProjectionDurableObject<Env> implements RPCApiHandler<API> {
  constructor(objectState: DurableObjectState, env: Env) {
    super(objectState, getHandlers(objectState.storage) as any, env, system);
  }

  findUserById: RPCHandler<API, "findUserById"> = async ({ id }) => {
    const val = await this.storage.get(`user:${id}`);
    return {
      user: val ? (val as UserProjection) : null,
    };
  };
}
