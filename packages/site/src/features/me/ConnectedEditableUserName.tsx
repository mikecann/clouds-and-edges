import * as React from "react";
import { EditableText } from "../editable/EditableText";
import { useSetName } from "../api/useSetName";

interface Props {
  name: string;
}

export const ConnectedEditableUserName: React.FC<Props> = ({ name }) => {
  const changeNameMutation = useSetName();
  return (
    <EditableText
      defaultValue={name}
      isDisabled={changeNameMutation.isLoading}
      placeholder={"Your Name"}
      fontSize={"5xl"}
      onSubmit={(name) => changeNameMutation.mutate({ name })}
    />
  );
};
