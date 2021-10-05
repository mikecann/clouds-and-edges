import * as React from "react";
import { EventsAdminLog } from "./EventsAdminLog";
import { useEventStoreEvents } from "../../api/useEventStoreEvents";
import { ConnectedInspectableStorage } from "../storage/ConnectedInspectableStorage";

interface Props {}

export const ConnectedEventsAdminLog: React.FC<Props> = ({}) => {
  const { data: events } = useEventStoreEvents();

  return <ConnectedInspectableStorage identifier={{ kind: "eventStore" }} />;
  //return <EventsAdminLog events={events?.events ?? []} />;
};
