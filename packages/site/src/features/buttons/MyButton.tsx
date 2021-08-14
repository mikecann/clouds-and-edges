import { Button } from "@chakra-ui/react";
import * as React from "react";
import { MyChakraProvider } from "../theme/MyChakraProvider";

interface Props {}

export const MyButton: React.FC<Props> = ({ children }) => {
  return <Button colorScheme="blue">{children}</Button>;
};
