import * as React from "react";
import { Button, Heading, Input } from "@chakra-ui/react";
import { Vertical } from "gls";
import { Logo } from "../logo/Logo";
import { useSignup } from "../api/useSignup";
import { useIsAuthenticated } from "../state/useIsAuthenticated";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

interface Props {}

export const SignupPage: React.FC<Props> = ({}) => {
  const [name, setName] = React.useState("");
  const isAuthed = useIsAuthenticated();
  const history = useHistory();
  const signupMutation = useSignup();

  useEffect(() => {
    if (isAuthed) history.push(`/me`);
  }, [isAuthed]);

  return (
    <Vertical
      style={{ width: "100vw", height: "100vh" }}
      horizontalAlign="center"
      verticalAlign="center"
    >
      <Vertical horizontalAlign="center" style={{ width: 300 }} spacing={10}>
        <Logo animation={"App-logo-spin infinite 2s ease"} />
        <Heading as="h1">Clouds & Edges</Heading>
        <Input placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Button
          isLoading={signupMutation.isLoading}
          disabled={signupMutation.isLoading}
          colorScheme="blue"
          onClick={() => signupMutation.mutate({ name })}
        >
          Signup
        </Button>
      </Vertical>
    </Vertical>
  );
};
