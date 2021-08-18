import { Button, ButtonProps, Link, LinkProps } from "@chakra-ui/react";
import * as React from "react";
import { useHistory } from "react-router-dom";

interface Props extends ButtonProps {
  to: string;
}

export const SidebarButton: React.FC<Props> = ({ to, ...rest }) => {
  const history = useHistory();
  return (
    <Button
      variant="unstyled"
      height={81}
      backgroundColor={`rgba(255,255,255,0.01)`}
      borderRadius={0}
      _hover={{ backgroundColor: `rgba(255,255,255,0.3)` }}
      _selected={{ border: 0 }}
      onClick={() => history.push(to)}
      {...rest}
    />
  );
};
