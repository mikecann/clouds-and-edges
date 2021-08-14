import * as React from "react";
import { storiesOf } from "@storybook/react";
import { {{pascalCase name}}Modal } from "./{{pascalCase name}}Modal";

const props: React.ComponentProps<typeof {{pascalCase name}}Modal> = {
  visible: false,
  onClose: storybookActionHandler(`onClose`)
};

storiesOf("{{pascalCase name}}Modal", module)
  .add("default", () => <{{pascalCase name}}Modal {...props} />)
  .add("visible", () => <{{pascalCase name}}Modal {...props} visible />)
