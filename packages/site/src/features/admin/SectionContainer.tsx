import * as React from "react";
import { Box, BoxProps, Heading } from "@chakra-ui/react";

interface Props extends BoxProps {
  title: string;
}

export const SectionContainer: React.FC<Props> = ({ title, children, ...rest }) => {
  return (
    <Box minWidth={300} backgroundColor={"rgba(0,0,0,0.2)"} borderRadius={6} padding={5} {...rest}>
      <Heading
        fontSize="xl"
        backgroundColor={"rgba(0,0,0,0.2)"}
        padding={2}
        borderRadius={10}
        paddingLeft={5}
      >
        {title}
      </Heading>
      <Box
        backgroundColor={"gray.200.200"}
        height={"100%"}
        overflowY={"auto"}
        overflowX={"hidden"}
        width={"100%"}
        marginTop={5}
      >
        {children}
      </Box>
    </Box>
  );
};
