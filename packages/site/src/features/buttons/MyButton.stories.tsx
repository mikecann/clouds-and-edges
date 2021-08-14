import * as React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MyButton } from "./MyButton";

export default {
  title: "MyButton",
  component: MyButton,
} as ComponentMeta<typeof MyButton>;

const Template: ComponentStory<typeof MyButton> = args => <MyButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
