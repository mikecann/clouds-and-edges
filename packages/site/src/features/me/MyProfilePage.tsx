import * as React from "react";
import { useMe } from "../api/useMe";
import { LoadingPage } from "../loading/LoadingPage";
import { SidebarPage } from "../page/SidebarPage";
import { ConnectedEditableUserName } from "./ConnectedEditableUserName";
import { Avatar, Box, Button, Center, HStack, Text, VStack } from "@chakra-ui/react";
import { useSignout } from "../api/useSignout";
import { VscSignOut } from "react-icons/vsc";

interface Props {}

export const MyProfilePage: React.FC<Props> = ({}) => {
  const { data: me } = useMe();
  const onSignout = useSignout();

  if (!me) return <LoadingPage />;

  return (
    <SidebarPage>
      <Center height={`100vh`}>
        <Box backgroundColor={"gray.700"} borderRadius={5} padding={10} position="relative">
          <HStack>
            <VStack>
              <Avatar
                borderColor={"gray.700"}
                borderWidth={10}
                position={"absolute"}
                top={`-80px`}
                size={"2xl"}
                icon={<Box>{me.avatar}</Box>}
              />
              <ConnectedEditableUserName name={me.name} />
              <Text color={"gray.500"}>{me.id}</Text>
              <Box height={5} />
              <Button onClick={onSignout} leftIcon={<VscSignOut />}>
                Signout
              </Button>
            </VStack>
          </HStack>
        </Box>
      </Center>
    </SidebarPage>
  );
};
