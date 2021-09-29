import { Env } from "../../env";
import { Projections } from "@project/shared";
import { RPCApiHandler, RPCHandler, ProjectionDurableObject } from "@project/workers-es";
import { getHandlers } from "./eventHandlers";
import { system } from "../../system";
import { createDb, Db } from "./db";

type API = Projections["matches"];

export class MatchesProjection extends ProjectionDurableObject<Env> implements RPCApiHandler<API> {
  private db: Db;

  constructor(objectState: DurableObjectState, env: Env) {
    super(objectState, getHandlers(createDb(objectState.storage)), env, system, "match");
    this.db = createDb(objectState.storage);
  }

  getMatch: RPCHandler<API, "getMatch"> = async ({ id }) => {
    return await this.db.get("match", id);
  };

  getOpen: RPCHandler<API, "getOpen"> = async ({}) => {
    const ids = await this.db.list("open", { prefix: "" }).then((map) => [...map.keys()]);
    return await Promise.all(ids.map((id) => this.db.get("match", id)));
  };

  getForPlayer: RPCHandler<API, "getForPlayer"> = async ({ playerId }) => {
    const player = await this.db.find("player", playerId);
    const matches = player?.matches ?? [];
    return await Promise.all(matches.map((id) => this.db.get("match", id)));
  };
}
