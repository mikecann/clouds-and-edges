import * as React from "react";
import { Accordion } from "@chakra-ui/react";
import { LogEntry } from "./LogEntry";
import { StoredEvent } from "@project/workers-es";

export interface EventsAdminLogProps {
  events: StoredEvent[];
}

export const EventsAdminLog: React.FC<EventsAdminLogProps> = ({ events }) => {
  return (
    <Accordion maxHeight={600} overflowY={"auto"}>
      {events
        .sort((a, b) => a.timestamp - b.timestamp)
        .map((event) => (
          <LogEntry key={event.id} event={event} />
        ))}
    </Accordion>
  );
};
