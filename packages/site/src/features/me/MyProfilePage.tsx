import * as React from "react";
import { Vertical } from "gls/lib";
import { useMe } from "../api/useMe";
import { LoadingPage } from "../loading/LoadingPage";
import { SidebarPage } from "../page/SidebarPage";
import { ConnectedEditableUserName } from "./ConnectedEditableUserName";
import { Avatar, Text } from "@chakra-ui/react";

interface Props {}

export const MyProfilePage: React.FC<Props> = ({}) => {
  const { data: me } = useMe();

  if (!me) return <LoadingPage />;

  return (
    <SidebarPage>
      <Vertical horizontalAlign="center">
        <Avatar size={"lg"} />
        <ConnectedEditableUserName name={me.name} />
        <Text color={"gray.500"}>{me.id}</Text>
      </Vertical>
    </SidebarPage>
  );
};
