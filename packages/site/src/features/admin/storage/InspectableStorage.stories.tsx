import * as React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InspectableStorage } from "./InspectableStorage";

export default {
  title: "InspectableStorage",
  component: InspectableStorage,
} as ComponentMeta<typeof InspectableStorage>;

const Template: ComponentStory<typeof InspectableStorage> = (args) => (
  <InspectableStorage {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  contents: {},
};
