import { AggregateNames } from "@project/shared";

export interface AddEventInput {
  kind: string;
  payload?: unknown;
}

export interface Event<TPayload = any> {
  kind: string;
  aggregate: AggregateNames;
  aggregateId: string;
  createdAt: number;
  payload?: TPayload;
}
