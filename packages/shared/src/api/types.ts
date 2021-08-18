import { z } from "zod";
import { UserProjection } from "../projections/projections";
import { Fail, Success } from "../utils/response";
import { Event } from "../events/events";

export type ApiEndpointResponse<T = any> = Success<T> | Fail;

export type AuthSignupResponse = { userId: string };

export const api = {
  query: {
    "user.get": {
      input: z.object({
        id: z.string(),
      }),
      output: UserProjection,
    },
    "admin.events": {
      input: z.object({}),
      output: z.array(Event),
    },
  },
  mutation: {
    "auth.signup": {
      input: z.object({
        name: z.string(),
      }),
      output: z.object({
        userId: z.string(),
      }),
    },
    command: {
      input: z.object({
        aggregate: z.string(),
        aggregateId: z.string().optional(),
        command: z.string(),
        payload: z.any().optional(),
      }),
      output: z.object({}),
    },
  },
};

export type RPCOperation = "query" | "mutation";

export type API = typeof api;

export type Queries = API["query"];

export type QueryNames = keyof Queries;

export type QueryInput<TQuery extends QueryNames> = z.infer<Queries[TQuery]["input"]>;

export type QueryOutput<TQuery extends QueryNames> = z.infer<Queries[TQuery]["output"]>;

export type Mutations = API["mutation"];

export type MutationNames = keyof Mutations;

export type MutationInput<TMutation extends MutationNames> = z.infer<Mutations[TMutation]["input"]>;

export type MutationOutput<TMutation extends MutationNames> = z.infer<
  Mutations[TMutation]["output"]
>;
