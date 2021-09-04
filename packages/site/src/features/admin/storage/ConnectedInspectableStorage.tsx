import * as React from "react";
import { useQueryStorage } from "../useQueryStorage";
import { InspectableStorage } from "./InspectableStorage";
import { DurableObjectIdentifier } from "@project/workers-es/dist";

interface Props {
  identifier: DurableObjectIdentifier;
}

export const ConnectedInspectableStorage: React.FC<Props> = ({ identifier }) => {
  const { data: contents } = useQueryStorage({ input: {}, identifier });
  return <InspectableStorage contents={contents ?? {}} />;
};
