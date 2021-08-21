import { Result } from "@project/essentials";
import { Projections } from "../projections/projections";
import { ProjectionAdminState, ProjectionDurableObjectAPI } from "@project/workers-es/dist";
import { StoredEvent } from "@project/workers-es";

export type API = {
  "projections.users.findUserById": Projections["users"]["findUserById"];
  "projections.users.getAdminState": {
    input: {};
    output: ProjectionAdminState;
  };
  "projections.users.rebuild": ProjectionDurableObjectAPI["rebuild"];
  "projections.users.getStorageContents": ProjectionDurableObjectAPI["getStorageContents"];
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
      aggregate: string;
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
