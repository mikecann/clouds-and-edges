import * as React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ProjectionInfo } from "./ProjectionInfo";
import { EventsAdminLog } from "../events/EventsAdminLog";

export default {
  title: "Projection Info",
  component: ProjectionInfo,
} as ComponentMeta<typeof ProjectionInfo>;

const Template: ComponentStory<typeof ProjectionInfo> = (args) => <ProjectionInfo {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  adminState: {
    status: "not-built",
  },
};
