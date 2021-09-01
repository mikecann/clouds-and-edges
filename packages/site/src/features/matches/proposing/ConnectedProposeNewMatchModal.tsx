import * as React from "react";
import { ProposeNewMatchModal } from "./ProposeNewMatchModal";
import { useProposeNewMatch } from "./useProposeNewMatch";

interface Props {
  isOpen: boolean;
  onClose: () => any;
}

export const ConnectedProposeNewMatchModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { mutateAsync, isLoading } = useProposeNewMatch();
  return (
    <ProposeNewMatchModal
      isOpen={isOpen}
      onClose={onClose}
      onPropose={(size) => mutateAsync({ size }).then(onClose)}
      isLoading={isLoading}
    />
  );
};
