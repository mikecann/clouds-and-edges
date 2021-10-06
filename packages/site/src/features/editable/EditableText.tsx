import * as React from "react";
import { EditableControls } from "./EditableControls";
import { Editable, EditableInput, EditablePreview, EditableProps, HStack } from "@chakra-ui/react";

interface Props extends EditableProps {}

export const EditableText: React.FC<Props> = ({ ...rest }) => {
  return (
    <Editable
      textAlign="center"
      defaultValue=""
      fontSize="2xl"
      isPreviewFocusable={false}
      {...rest}
    >
      <HStack justifyContent={"center"} spacing={10}>
        <EditablePreview />
        <EditableInput />
        <EditableControls />
      </HStack>
    </Editable>
  );
};
