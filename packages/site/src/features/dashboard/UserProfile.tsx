import * as React from "react";
import { UserProjection, AuthSignupResponse } from "@project/shared";
import { Vertical } from "gls/lib";
import { Heading, Button, Input } from "@chakra-ui/react";
import { useSetName } from "../api/useSetName";

interface Props {
  me: UserProjection;
}

export const UserProfile: React.FC<Props> = ({ me }) => {
  const [name, setName] = React.useState(me.name);

  const changeNameMutation = useSetName();

  React.useEffect(() => setName(me.name), [me.name]);

  return (
    <Vertical horizontalAlign="center">
      <Heading as="h2">{me.name}</Heading>
      <Vertical style={{ maxWidth: 300 }}>
        <Input placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Button
          disabled={name == me.name || changeNameMutation.isLoading}
          isLoading={changeNameMutation.isLoading}
          colorScheme="blue"
          onClick={() => changeNameMutation.mutate({ name })}
        >
          Change Name
        </Button>
      </Vertical>
    </Vertical>
  );
};
