import * as React from "react";
import { HStack, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { SectionContainer } from "../SectionContainer";
import { ConnectedProcessAdmin } from "./ConnectedProcessAdmin";

interface Props {}

export const ProcessesAdmin: React.FC<Props> = ({}) => {
  return (
    <Tabs width={"100%"} orientation={"vertical"} isLazy>
      <TabList minWidth={200} backgroundColor={"rgba(0,0,0,0.2)"} borderRadius={6} padding={5}>
        <Tab>MatchCreation</Tab>
        <Tab>MatchJoining</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <ConnectedProcessAdmin process={"matchCreation"} />
        </TabPanel>
        <TabPanel>
          <ConnectedProcessAdmin process={"matchJoining"} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
