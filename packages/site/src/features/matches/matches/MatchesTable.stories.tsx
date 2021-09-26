import * as React from "react";
import { Meta } from "@storybook/react";

import { produceCellStates, producePlayerState } from "@project/shared";
import { produce } from "immer";
import { MatchesTable } from "./MatchesTable";

export default {
  title: "MatchesTable",
  component: MatchesTable,
} as Meta;

const props: React.ComponentProps<typeof MatchesTable> = {
  matches: [],
  onJoin: () => alert(`onJoin`),
  onCancel: () => alert(`onCancel`),
  onOpen: () => alert(`onOpen`),
  isLoading: false,
};

export const Primary = () => <MatchesTable {...props} />;
