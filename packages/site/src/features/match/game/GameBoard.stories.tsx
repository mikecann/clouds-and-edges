import * as React from "react";
import { storiesOf } from "@storybook/react";
import { GameBoard } from "./GameBoard";

const props: React.ComponentProps<typeof GameBoard> = {};

storiesOf("GameBoard", module).add("default", () => <GameBoard {...props} />);
