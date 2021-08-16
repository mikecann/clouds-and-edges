import * as React from "react";
import { Button, Input } from "@chakra-ui/react";
import { sendCommand } from "../cqrs/sendCommand";
import { Horizontal, Vertical } from "gls";

interface Props {
  onSignup: (userId: string) => any;
}

export const SignupPage: React.FC<Props> = ({onSignup}) => {
  return (
    <Vertical spacing={10}>
      <Input placeholder="Your Name" />
      <Button
        colorScheme="blue"
        onClick={() =>
          sendCommand({
            aggregate: "user",
            command: "create",
            payload: {
              name: "Mike",
            },
          })
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