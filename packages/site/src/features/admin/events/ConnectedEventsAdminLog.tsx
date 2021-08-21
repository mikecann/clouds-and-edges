import * as React from "react";
import { EventsAdminLog } from "./EventsAdminLog";
import { useEventStoreEvents } from "../../api/useEventStoreEvents";

interface Props {}

export const ConnectedEventsAdminLog: React.FC<Props> = ({}) => {
  const { data: events } = useEventStoreEvents();

  return <EventsAdminLog events={events?.events ?? []} />;
};
