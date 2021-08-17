import * as React from "react";
import { Vertical } from "gls";
import { UserProfile } from "./UserProfile";
import { Heading, Button } from "@chakra-ui/react";
import { apiMutate } from "../api/apiMutate";
import { useMe } from "../api/useMe";
import { ConnectedDashboardSidebar } from "./sidebar/ConnectedDashboardSidebar";

interface Props {
  userId: string;
}

export const DashboardPage: React.FC<Props> = ({ userId }) => {
  const { data: me, refetch: refetchMe } = useMe();

  // const setNameMutation = useMutation(postTodo, {
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries('me')
  //   },
  // })

  return (
    <Vertical spacing={10}>
      <ConnectedDashboardSidebar />
      <Heading as="h1">Dashboard Page</Heading>
      <div style={{ opacity: 0.5 }}>Your UserID is: {userId}</div>
      {!me ? (
        <div>Loading..</div>
      ) : (
        <Vertical>
          <UserProfile me={me} />
          <Button colorScheme="blue" onClick={() => refetchMe()}>
            Refetch Me
          </Button>
        </Vertical>
      )}
    </Vertical>
  );
};
