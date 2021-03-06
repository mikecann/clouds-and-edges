import * as React from "react";
import { useQueryStorage } from "./useQueryStorage";
import { InspectableStorage } from "./InspectableStorage";
import { DurableObjectIdentifier } from "@project/workers-es";

interface Props {
  identifier: DurableObjectIdentifier;
}

export const ConnectedInspectableStorage: React.FC<Props> = ({ identifier }) => {
  const [prefix, setPrefix] = React.useState("");
  const [limit, setLimit] = React.useState<number>();
  const [start, setStart] = React.useState("");
  const [reverse, setReverse] = React.useState(false);

  const {
    data: contents,
    refetch,
    isLoading,
  } = useQueryStorage({ input: { prefix, limit, start, reverse }, identifier });

  return (
    <InspectableStorage
      contents={contents ?? {}}
      onQueryChange={setPrefix}
      onLimitChange={setLimit}
      onStartChange={setStart}
      onReverseChange={setReverse}
      onReload={refetch}
      isLoading={isLoading}
    />
  );
};
