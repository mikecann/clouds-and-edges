import * as React from "react";
import { EditableControls } from "./EditableControls";
import { Editable, EditableInput, EditablePreview, EditableProps } from "@chakra-ui/react";
import { Horizontal } from "gls";

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
      <Horizontal verticalAlign={"center"} spacing={10}>
        <EditablePreview />
        <EditableInput />
        <EditableControls />
      </Horizontal>
    </Editable>
  );
};
