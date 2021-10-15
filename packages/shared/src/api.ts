import { Result } from "@project/essentials";
import { Projections } from "./projections";
import { DurableObjectIdentifier, QueryStorageAPI, StoredEvent } from "@project/workers-es";
import { AggregateKinds } from "./aggregates";
import { MatchProjection } from "./match/projections";

export type API = {
  "projections.users.findUserById": Projections["users"]["findUserById"];
  "projections.matches.getMine": {
    input: Record<string, never>;
    output: MatchProjection[];
  };
  "projections.matches.getMatch": Projections["matches"]["getMatch"];
  "projections.matches.getOpen": Projections["matches"]["getOpen"];
  "admin.queryStorage": {
    input: {
      identifier: DurableObjectIdentifier;
      input: QueryStorageAPI["input"];
    };
    output: QueryStorageAPI["output"];
  };
  "admin.rebuild": {
    input: {
      identifier: DurableObjectIdentifier;
      input: Record<string, never>;
    };
    output: Record<string, never>;
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
