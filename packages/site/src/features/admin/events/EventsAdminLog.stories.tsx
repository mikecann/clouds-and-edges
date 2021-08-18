import * as React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { EventsAdminLog } from "./EventsAdminLog";
import { createFakeEvent } from "../../fake/fake";

export default {
  title: "Events Admin Log",
  component: EventsAdminLog,
} as ComponentMeta<typeof EventsAdminLog>;

const Template: ComponentStory<typeof EventsAdminLog> = (args) => (
  <EventsAdminLog {...args}>hello world</EventsAdminLog>
);

export const Primary = Template.bind({});
Primary.args = {
  events: [
    createFakeEvent(),
    createFakeEvent(),
    createFakeEvent(),
    createFakeEvent(),
    createFakeEvent(),
    createFakeEvent(),
    createFakeEvent(),
  ],
};

export const TooLongName = Template.bind({});
TooLongName.args = {
  events: Primary.args.events,
};
