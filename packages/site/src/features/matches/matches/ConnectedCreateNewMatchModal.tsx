import * as React from "react";
import { CreateNewMatchModal } from "./CreateNewMatchModal";
import { useCreateNewMatch } from "./useCreateNewMatch";

interface Props {
  isOpen: boolean;
  onClose: () => any;
}

export const ConnectedCreateNewMatchModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { mutateAsync, isLoading } = useCreateNewMatch();
  return (
    <CreateNewMatchModal
      isOpen={isOpen}
      onClose={onClose}
      onPropose={(size) => mutateAsync({ size }).then(onClose)}
      isLoading={isLoading}
    />
  );
};
