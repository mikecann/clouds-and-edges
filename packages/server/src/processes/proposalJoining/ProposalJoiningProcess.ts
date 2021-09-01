import { Env } from "../../env";
import { Processes } from "@project/shared";
import { RPCApiHandler, ProcessDurableObject } from "@project/workers-es";
import { system } from "../../system";
import { proposalJoiningEventHandlers } from "./eventHandlers";

type API = Processes["proposalJoined"];

export class ProposalJoiningProcess extends ProcessDurableObject<Env> {
  constructor(objectState: DurableObjectState, env: any) {
    super(objectState, proposalJoiningEventHandlers as any, env, system);
  }
}
