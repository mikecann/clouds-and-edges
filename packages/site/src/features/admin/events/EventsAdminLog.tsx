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
      {events.map((event) => (
        <LogEntry key={event.id} event={event} />
      ))}
    </Accordion>
  );
};
