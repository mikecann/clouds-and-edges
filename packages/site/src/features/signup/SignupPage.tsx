import * as React from "react";
import { Button, Heading, Input, VStack } from "@chakra-ui/react";
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
    <VStack width="100vw" height="100vh" alignItems="center" justifyContent="center">
      <VStack justifyContent="center" width="400px" spacing={5} borderRadius={"10px"} padding={10}>
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
      </VStack>
    </VStack>
  );
};
