import * as React from "react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { SectionContainer } from "../SectionContainer";
import { ConnectedProjectionAdmin } from "./ConnectedProjectionAdmin";

interface Props {}

export const ProjectionsAdmin: React.FC<Props> = ({}) => {
  return (
    <Tabs width={"100%"} orientation={"vertical"} isLazy>
      <TabList minWidth={200} backgroundColor={"rgba(0,0,0,0.2)"} borderRadius={6} padding={5}>
        <Tab>Users</Tab>
        <Tab>Matches</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <ConnectedProjectionAdmin projection={"users"} />
        </TabPanel>
        <TabPanel>
          <ConnectedProjectionAdmin projection={"matches"} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
