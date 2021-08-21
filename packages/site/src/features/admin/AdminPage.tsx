import * as React from "react";
import { SidebarPage } from "../page/SidebarPage";
import { Center, Heading, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { SectionContainer } from "./SectionContainer";
import { ConnectedEventsAdminLog } from "./events/ConnectedEventsAdminLog";
import { ConnectedProjectionInfo } from "./projections/ConnectedProjectionInfo";

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
              <ConnectedProjectionInfo />
            </SectionContainer>
          </WrapItem>
          {/*<WrapItem>*/}
          {/*  <Center w="180px" h="80px" bg="green.200">*/}
          {/*    Box 2*/}
          {/*  </Center>*/}
          {/*</WrapItem>*/}
          {/*<WrapItem>*/}
          {/*  <Center w="180px" h="80px" bg="tomato">*/}
          {/*    Box 3*/}
          {/*  </Center>*/}
          {/*</WrapItem>*/}
          {/*<WrapItem>*/}
          {/*  <Center w="180px" h="80px" bg="blue.200">*/}
          {/*    Box 4*/}
          {/*  </Center>*/}
          {/*</WrapItem>*/}
        </Wrap>
      </VStack>
    </SidebarPage>
  );
};
