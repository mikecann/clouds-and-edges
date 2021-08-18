import * as React from "react";
import { ButtonGroup, Flex, IconButton, useEditableControls } from "@chakra-ui/react";
import { IoCheckmark, IoMdClose, RiEditFill } from "react-icons/all";

interface Props {}

export const EditableControls: React.FC<Props> = ({}) => {
  const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } =
    useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent="center" size="sm">
      <IconButton
        aria-label="Submit Name Change"
        icon={<IoCheckmark />}
        {...getSubmitButtonProps()}
      />
      <IconButton
        aria-label="Cancel Name Change"
        icon={<IoMdClose />}
        {...getCancelButtonProps()}
      />
    </ButtonGroup>
  ) : (
    <Flex justifyContent="center">
      <IconButton
        aria-label="Start Editing Change Name"
        size="sm"
        icon={<RiEditFill />}
        {...getEditButtonProps()}
      />
    </Flex>
  );
};
