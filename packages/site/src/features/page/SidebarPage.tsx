import * as React from "react";
import { ConnectedDashboardSidebar } from "../sidebar/ConnectedDashboardSidebar";
import { VStack } from "@chakra-ui/react";

interface Props {}

export const SidebarPage: React.FC<Props> = ({ children }) => {
  return (
    <div style={{ minHeight: "100vh", overflow: "hidden" }}>
      <ConnectedDashboardSidebar />
      <VStack marginLeft={120} marginTop={5} overflowX={"hidden"} overflowY={"auto"}>
        {children}
      </VStack>
    </div>
  );
};

//maxWidth={800} minWidth={800}
