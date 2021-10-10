import {
  Avatar,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Box,
  VStack,
  Spacer,
} from "@chakra-ui/react";
import * as React from "react";
import { useMe } from "../me/useMe";
import { SidebarButton } from "./SidebarButton";

interface Props {}

export const ConnectedDashboardSidebar: React.FC<Props> = ({}) => {
  const { me } = useMe();

  return (
    <VStack
      backgroundColor="gray.900"
      width="100px"
      height="100vh"
      position="fixed"
      alignItems="stretch"
      top={0}
      left={0}
      padding={0}
    >
      <SidebarButton to={"/me"}>
        <Avatar icon={<Box>{me?.avatar}</Box>} />
      </SidebarButton>
      <SidebarButton to={"/matches"}>Matches</SidebarButton>
      <Spacer />
      <SidebarButton to={"/admin"}>Admin</SidebarButton>
    </VStack>
  );
};
