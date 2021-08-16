import * as React from "react";
import { Button, Input } from "@chakra-ui/react";
import {  Vertical } from "gls";
import {callApiEndpoint} from '../api/callApiEndpoint';
import {  AuthSignupResponse } from "@project/shared";

interface Props {
  onSignup: (userId: string) => any;
}

export const SignupPage: React.FC<Props> = ({onSignup}) => {

  const [name, setName] = React.useState("");

  const signup = async () => {
    const resp: AuthSignupResponse = await callApiEndpoint({ path: `auth/signup`,  
    input: {
      name
    }});
    onSignup(resp.userId);
  }

  return (
    <Vertical spacing={10}>
      <Input placeholder="Your Name" value={name} onChange={e => setName(e.target.value)}/>
      <Button
        colorScheme="blue"
        onClick={() =>
          signup()
        }
      >
        Signup
      </Button>
    </Vertical>
  );
};


/*

 sendCommand({
            aggregate: "user",
            command: "create",
            payload: {
              name: "Mike",
            },
          }) 
          */