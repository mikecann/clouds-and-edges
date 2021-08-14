import * as React from "react";
import { Vertical } from "gls";

interface Props {
  visible: boolean;
  onClose: () => any;
}

export const {{pascalCase name}}Modal: React.FC<Props> = ({ visible, onClose }) => {
  return <LayeredModal
    layer={ModalLayers.Standard}
    width={400}
    centered
    onCancel={onClose}
    visible={visible}
  >
    <Vertical horizontalAlign="center" spacing={10} width="100%">
      <SubheadingText>{{pascalCase name}}</SubheadingText>
      <Vertical width="100%" spacing={0}>
      </Vertical>
    </Vertical>
  </LayeredModal>;
}
