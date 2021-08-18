import * as React from "react";
import { Vertical } from "gls/lib";
import { Spinner } from "@chakra-ui/react";

interface Props {}

export const LoadingPage: React.FC<Props> = ({}) => {
  return (
    <Vertical horizontalAlign={"center"} verticalAlign={"center"} minHeight={"100vh"}>
      <Spinner size="xl" />
    </Vertical>
  );
};
