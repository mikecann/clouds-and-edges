import { Event } from "../events/events";
import { Result } from "@project/essentials";
import { Projections } from "../projections/projections";

export type API = {
  "projection.user.findUserById": Projections["users"]["findUserById"];
  "event-store.events": {
    input: {};
    output: Event[];
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
