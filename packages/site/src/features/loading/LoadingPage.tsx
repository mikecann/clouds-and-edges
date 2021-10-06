import * as React from "react";
import { Center, Spinner } from "@chakra-ui/react";

interface Props {}

export const LoadingPage: React.FC<Props> = ({}) => {
  return (
    <Center minHeight={"100vh"}>
      <Spinner size="xl" />
    </Center>
  );
};
