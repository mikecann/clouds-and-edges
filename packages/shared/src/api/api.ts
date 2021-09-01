import { Result } from "@project/essentials";
import { ProjectionKinds, Projections } from "../projections/projections";
import { ProjectionDurableObjectAPI } from "@project/workers-es";
import { StoredEvent } from "@project/workers-es";
import { AggregateKinds } from "../aggregates/aggregates";

export type API = {
  "projections.users.findUserById": Projections["users"]["findUserById"];
  "projection.admin": {
    input: {
      projection: ProjectionKinds;
      operation: keyof ProjectionDurableObjectAPI;
      payload: any;
    };
    output: any;
  };
  "projections.proposals.getProposals": Projections["proposals"]["getProposals"];
  "event-store.events": {
    input: {};
    output: {
      events: StoredEvent[];
    };
  };
  "auth.signup": {
    input: {
      name: string;
    };
    output: {
      userId: string;
    };
  };
  command: {
    input: {
      aggregate: AggregateKinds;
      aggregateId?: string;
      command: string;
      payload: unknown;
    };
    output: Result<{
      aggregateId: string;
    }>;
  };
};

export type APIOperations = keyof API;

export type APIOperationInput<TOperation extends APIOperations> = API[TOperation]["input"];
export type APIOperationOutput<TOperation extends APIOperations> = API[TOperation]["output"];
