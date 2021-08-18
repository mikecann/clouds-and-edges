import * as React from "react";
import { Accordion } from "@chakra-ui/react";
import { Event } from "@project/shared";
import { LogEntry } from "./LogEntry";

export interface EventsAdminLogProps {
  events: Event[];
}

export const EventsAdminLog: React.FC<EventsAdminLogProps> = ({ events }) => {
  return (
    <Accordion>
      {events.map((event) => (
        <LogEntry key={event.id} event={event} />
      ))}
    </Accordion>
  );
};
