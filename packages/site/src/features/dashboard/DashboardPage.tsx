import * as React from "react";
import { Vertical } from "gls";
import { useApiQuery } from "../api/useApiEndpointQuery";

interface Props {
  userId: string;
}

export const DashboardPage: React.FC<Props> = ({ userId }) => {
  const user = useApiQuery("user.get", { id: userId });

  return (
    <Vertical spacing={10}>
      <div>Dashboard Page</div>
      <div>Your UserID is: {userId}</div>
      {!user ? <div>Loading..</div> : <div>{JSON.stringify(user)}</div>}
    </Vertical>
  );
};
