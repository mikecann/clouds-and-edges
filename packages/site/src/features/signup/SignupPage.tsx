import * as React from "react";
import { Button, Heading, Input } from "@chakra-ui/react";
import { Vertical } from "gls";
import { AuthSignupResponse } from "@project/shared";
import { apiMutate } from "../api/apiMutate";
import { Logo } from "./Logo";
import { useAppState } from "../state/app";

interface Props {}

export const SignupPage: React.FC<Props> = ({}) => {
  const [name, setName] = React.useState("");
  const [state, setState] = useAppState();

  const signup = async () => {
    const resp: AuthSignupResponse = await apiMutate("auth.signup", { name });
    //onSignup(resp.userId);
  };

  return (
    <Vertical
      style={{ width: "100vw", height: "100vh" }}
      horizontalAlign="center"
      verticalAlign="center"
    >
      <Vertical horizontalAlign="center" style={{ width: 300 }} spacing={10}>
        <Logo />
        <Heading as="h1">TikTacFlare</Heading>
        <Input placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Button colorScheme="blue" onClick={() => signup()}>
          Signup
        </Button>
      </Vertical>
    </Vertical>
  );
};
