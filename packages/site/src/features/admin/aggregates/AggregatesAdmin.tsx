import * as React from "react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { SectionContainer } from "../SectionContainer";

interface Props {}

export const AggregatesAdmin: React.FC<Props> = ({}) => {
  return (
    <Tabs width={"100%"} orientation={"vertical"} isLazy>
      <TabList minWidth={200} backgroundColor={"rgba(0,0,0,0.2)"} borderRadius={6} padding={5}>
        <Tab>User</Tab>
        <Tab>Match</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <SectionContainer title={"User"}>User</SectionContainer>
        </TabPanel>
        <TabPanel>
          <SectionContainer title={"Match"}>Match</SectionContainer>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
