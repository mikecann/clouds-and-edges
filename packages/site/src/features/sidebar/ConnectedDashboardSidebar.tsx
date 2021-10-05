import { Avatar, Tab, TabList, TabPanel, TabPanels, Tabs, Box } from "@chakra-ui/react";
import { Stretch, StretchSpacer, Vertical } from "gls/lib";
import * as React from "react";
import { useMe } from "../api/useMe";
import { SidebarButton } from "./SidebarButton";

interface Props {}

export const ConnectedDashboardSidebar: React.FC<Props> = ({}) => {
  const { data: me } = useMe();

  return (
    <Vertical
      style={{
        backgroundColor: `rgba(0,0,0,0.5)`,
        width: 100,
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      {/* <Tabs width={100} isFitted orientation="vertical">
        <TabList sp>
          <Tab _selected={{ color: "white", bg: "blue.500" }}>
            <Avatar />
          </Tab>
          <Tab _selected={{ color: "white", bg: "green.400" }}>Matches</Tab>
        </TabList>
      </Tabs> */}
      <SidebarButton to={"/me"}>
        <Avatar icon={<Box>{me?.avatar}</Box>} />
      </SidebarButton>
      <SidebarButton to={"/matches"}>Matches</SidebarButton>
      <StretchSpacer />
      <SidebarButton to={"/admin"}>Admin</SidebarButton>
    </Vertical>
  );
};
