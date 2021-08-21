export interface StoredEvent {
  id: string;
  kind: string;
  aggregate: string;
  aggregateId: string;
  payload: unknown;
  timestamp: number;
}
