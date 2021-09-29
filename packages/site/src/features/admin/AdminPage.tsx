import * as React from "react";
import { SidebarPage } from "../page/SidebarPage";
import { Center, Heading, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { SectionContainer } from "./SectionContainer";
import { ConnectedEventsAdminLog } from "./events/ConnectedEventsAdminLog";
import { ConnectedProjectionInfo } from "./projections/ConnectedProjectionInfo";
import { ConnectedProcessInfo } from "./processes/ConnectedProcessInfo";

interface Props {}

export const AdminPage: React.FC<Props> = ({}) => {
  return (
    <SidebarPage>
      <VStack>
        <Heading as={"h1"}>Admin Page</Heading>
        <Text marginBottom={5}>Some information on the state of the system</Text>
        <Wrap>
          <WrapItem>
            <SectionContainer title={"Event Log"}>
              <ConnectedEventsAdminLog />
            </SectionContainer>
          </WrapItem>
          <WrapItem>
            <SectionContainer title={"Users Projection"}>
              <ConnectedProjectionInfo projection={"users"} />
            </SectionContainer>
          </WrapItem>
          <WrapItem>
            <SectionContainer title={"Matches Projection"}>
              <ConnectedProjectionInfo projection={"matches"} />
            </SectionContainer>
          </WrapItem>
          <WrapItem>
            <SectionContainer title={"Match Creation Process"}>
              <ConnectedProcessInfo process={"matchCreation"} />
            </SectionContainer>
          </WrapItem>
          <WrapItem>
            <SectionContainer title={"Match Joining Process"}>
              <ConnectedProcessInfo process={"matchJoining"} />
            </SectionContainer>
          </WrapItem>
        </Wrap>
      </VStack>
    </SidebarPage>
  );
};
