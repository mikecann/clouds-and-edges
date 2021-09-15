import * as React from "react";
import { Box, BoxProps } from "@chakra-ui/react";

interface Props extends BoxProps {}

export const Line: React.FC<Props> = ({ ...rest }) => {
  return <Box {...rest}></Box>;
};
