import * as React from "react";
import { ChakraProvider, ThemeConfig , extendTheme } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const theme = extendTheme(config);

interface Props {}

export const ProjectChakraProvider: React.FC<Props> = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};
