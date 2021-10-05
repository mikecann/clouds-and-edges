import * as React from "react";
import { Box, BoxProps, Heading, VStack } from "@chakra-ui/react";

interface Props extends BoxProps {
  title: string;
}

export const SectionContainer: React.FC<Props> = ({ title, children, ...rest }) => {
  return (
    <VStack
      minWidth={300}
      spacing={5}
      alignItems={"flex-start"}
      border="1px solid rgba(255,255,255,0.1)"
      borderRadius="5px"
      padding={5}
      {...rest}
    >
      <Heading fontSize="3xl">{title}</Heading>
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
    </VStack>
  );
};
