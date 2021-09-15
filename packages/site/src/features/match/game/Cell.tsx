import * as React from "react";
import { Box } from "@chakra-ui/react";

interface Props {}

export const Cell: React.FC<Props> = ({}) => {
  return (
    <Box width={`50px`} height={`50px`} backgroundColor={`red`}>
      hello Cell
    </Box>
  );
};
