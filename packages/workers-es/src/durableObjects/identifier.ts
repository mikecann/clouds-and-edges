export interface ProcessIdentifier {
  kind: "process";
  name: string;
}

export interface ProjectionIdentifier {
  kind: "projection";
  name: string;
}

export interface EventStoreIdentifier {
  kind: "eventStore";
}

export interface AggregateIdentifier {
  kind: "aggregate";
  name: string;
  id: string;
}

export type DurableObjectIdentifier =
  | ProcessIdentifier
  | ProjectionIdentifier
  | EventStoreIdentifier
  | AggregateIdentifier;
