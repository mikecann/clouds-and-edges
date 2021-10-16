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
        <TabPanel paddingTop={0} paddingBottom={0}>
          <SectionContainer title={"User"}>Todo: Implement me :)</SectionContainer>
        </TabPanel>
        <TabPanel paddingTop={0} paddingBottom={0}>
          <SectionContainer title={"Match"}>Todo: Implement me :)</SectionContainer>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
