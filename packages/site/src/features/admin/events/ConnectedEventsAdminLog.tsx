import * as React from "react";
import { EventsAdminLog } from "./EventsAdminLog";
import { useAdminEvents } from "../../api/useAdminEvents";

interface Props {}

export const ConnectedEventsAdminLog: React.FC<Props> = ({}) => {
  const { data: events } = useAdminEvents();

  return <EventsAdminLog events={events ?? []} />;
};
