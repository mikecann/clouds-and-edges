import * as React from "react";
import { SidebarPage } from "../page/SidebarPage";
import {
  Center,
  Heading,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  Tab,
  Wrap,
  WrapItem,
  HStack,
} from "@chakra-ui/react";
import { SectionContainer } from "./SectionContainer";
import { ConnectedEventsAdminLog } from "./events/ConnectedEventsAdminLog";
import { ConnectedProjectionAdmin } from "./projections/ConnectedProjectionAdmin";
import { ConnectedProcessAdmin } from "./processes/ConnectedProcessAdmin";
import { ProcessesAdmin } from "./processes/ProcessesAdmin";
import { AggregatesAdmin } from "./aggregates/AggregatesAdmin";
import { ProjectionsAdmin } from "./projections/ProjectionsAdmin";

interface Props {}

export const AdminPage: React.FC<Props> = ({}) => {
  return (
    <SidebarPage>
      <VStack width={"100%"} padding={5}>
        <Heading as={"h1"}>Admin Page</Heading>
        <Text marginBottom={5}>Some information on the state of the system</Text>

        <Tabs width={"100%"} isLazy>
          <TabList>
            <Tab>Events</Tab>
            <Tab>Aggregates</Tab>
            <Tab>Processes</Tab>
            <Tab>Projections</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <SectionContainer title={"Event Log"}>
                <ConnectedEventsAdminLog />
              </SectionContainer>
            </TabPanel>
            <TabPanel>
              <AggregatesAdmin />
            </TabPanel>
            <TabPanel>
              <ProcessesAdmin />
            </TabPanel>
            <TabPanel>
              <ProjectionsAdmin />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </SidebarPage>
  );
};
