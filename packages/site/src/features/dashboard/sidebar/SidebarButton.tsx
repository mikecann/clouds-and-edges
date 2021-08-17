import { Button } from "@chakra-ui/react";
import * as React from "react";

interface Props {}

export const SidebarButton: React.FC<Props> = ({ children }) => {
  return (
    <Button
      variant="unstyled"
      height={81}
      backgroundColor={`rgba(255,255,255,0.01)`}
      borderRadius={0}
      _hover={{ backgroundColor: `rgba(255,255,255,0.3)` }}
      _selected={{ border: 0 }}
    >
      {children}
    </Button>
  );
};
