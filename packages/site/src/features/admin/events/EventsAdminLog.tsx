import * as React from "react";
import { StoredEvent } from "@project/workers-es";
import { KeyValueTable } from "../storage/KeyValueTable";

export interface EventsAdminLogProps {
  events: StoredEvent[];
}

export const EventsAdminLog: React.FC<EventsAdminLogProps> = ({ events }) => {
  const kv = events
    .sort((a, b) => a.timestamp - b.timestamp)
    .map((event) => [event.id, event] as const);

  return <KeyValueTable data={kv as any} />;
};
