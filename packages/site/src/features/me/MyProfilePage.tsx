import * as React from "react";
import { useMe } from "../api/useMe";
import { LoadingPage } from "../loading/LoadingPage";
import { SidebarPage } from "../page/SidebarPage";
import { ConnectedEditableUserName } from "./ConnectedEditableUserName";
import { Avatar, Button, Text, VStack } from "@chakra-ui/react";
import { useSignout } from "../api/useSignout";

interface Props {}

export const MyProfilePage: React.FC<Props> = ({}) => {
  const { data: me } = useMe();
  const onSignout = useSignout();

  if (!me) return <LoadingPage />;

  return (
    <SidebarPage>
      <VStack>
        <Avatar size={"lg"} />
        <ConnectedEditableUserName name={me.name} />
        <Text color={"gray.500"}>{me.id}</Text>
        <Button onClick={onSignout}>Signout</Button>
      </VStack>
    </SidebarPage>
  );
};
