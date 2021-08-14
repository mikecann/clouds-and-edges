import * as React from "react";
import { {{pascalCase name}}Modal } from "./{{pascalCase name}}Modal";
import { observer } from "mobx-react-lite";

interface Props {

}

export const Connected{{pascalCase name}}Modal: React.FC<Props> = observer(({ }) => {

  const onClose = () => {};
  const visible = true;

  return <{{pascalCase name}}Modal visible={visible} onClose={onClose} />
});
