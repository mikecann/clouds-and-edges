import * as React from "react";
import { Vertical } from "gls";
import { useMe } from "../api/useMe";
import { ConnectedDashboardSidebar } from "../sidebar/ConnectedDashboardSidebar";
import { useAppState } from "../state/appState";
import { SidebarPage } from "../page/SidebarPage";

interface Props {}

export const DashboardPage: React.FC<Props> = ({}) => {
  const [{ userId }] = useAppState();
  const { data: me, refetch: refetchMe } = useMe();

  // const setNameMutation = useMutation(postTodo, {
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries('me')
  //   },
  // })

  return (
    <SidebarPage>
      {/*<Heading as="h1">Dashboard Page</Heading>*/}
      {/*<div style={{ opacity: 0.5 }}>Your UserID is: {userId}</div>*/}
      {/*{!me ? (*/}
      {/*  <div>Loading..</div>*/}
      {/*) : (*/}
      {/*  <Vertical>*/}
      {/*    <MyProfilePage me={me} />*/}
      {/*    <Button colorScheme="blue" onClick={() => refetchMe()}>*/}
      {/*      Refetch Me*/}
      {/*    </Button>*/}
      {/*  </Vertical>*/}
      {/*)}*/}
    </SidebarPage>
  );
};
