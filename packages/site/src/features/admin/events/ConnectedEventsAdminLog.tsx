import * as React from "react";
import { ConnectedInspectableStorage } from "../storage/ConnectedInspectableStorage";

interface Props {}

export const ConnectedEventsAdminLog: React.FC<Props> = ({}) => {
  return <ConnectedInspectableStorage identifier={{ kind: "eventStore" }} />;
  //return <EventsAdminLog events={events?.events ?? []} />;
};
