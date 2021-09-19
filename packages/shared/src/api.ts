import { Result } from "@project/essentials";
import { Projections } from "./projections";
import { DurableObjectIdentifier, QueryStorageAPI , StoredEvent } from "@project/workers-es";
import { AggregateKinds } from "./aggregates";

export type API = {
  "projections.users.findUserById": Projections["users"]["findUserById"];
  "projections.matches.getMatches": Projections["matches"]["getMatches"];
  "projections.matches.getMatch": Projections["matches"]["getMatch"];
  "projections.openMatches.getOpenMatches": Projections["openMatches"]["getOpenMatches"];
  "admin.queryStorage": {
    input: {
      identifier: DurableObjectIdentifier;
      input: QueryStorageAPI["input"];
    };
    output: QueryStorageAPI["output"];
  };
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
