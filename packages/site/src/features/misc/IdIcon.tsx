import * as React from "react";
import { Box, BoxProps, Icon, Tooltip } from "@chakra-ui/react";
import { FaHashtag, HiHashtag } from "react-icons/all";

interface Props extends BoxProps {
  id: string;
}

export const IdIcon: React.FC<Props> = ({ id, ...rest }) => {
  return (
    <Tooltip label={id}>
      <Box display={"inline-block"} cursor={"help"} {...rest}>
        <Icon fontSize={`0.5em`} as={FaHashtag} color={"gray.500"} />
      </Box>
    </Tooltip>
  );
};
