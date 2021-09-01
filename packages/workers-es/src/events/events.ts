export interface EventInput {
  kind: string;
  payload: unknown;
}

export interface StoredEvent<TInp extends EventInput = EventInput> {
  id: string;
  kind: TInp["kind"];
  aggregate: string;
  aggregateId: string;
  payload: TInp["payload"];
  timestamp: number;
}
