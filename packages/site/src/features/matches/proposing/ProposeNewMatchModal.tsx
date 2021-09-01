import * as React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MatchProposalSize } from "@project/shared";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => any;
  onPropose: (size: MatchProposalSize) => any;
}

export const ProposeNewMatchModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onPropose,
  isLoading,
}) => {
  const [size, setSize] = useState<MatchProposalSize>(`small`);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Propose New Match</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack alignItems={"left"}>
            <Text>Map Size</Text>
            <Select value={size} onChange={(e) => setSize(e.target.value as any)}>
              <option value="small">3x3 (small)</option>
              <option value="medium">5x5 (medium)</option>
              <option value="large">7x7 (large)</option>
            </Select>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => onPropose(size)}
            isLoading={isLoading}
            disabled={isLoading}
          >
            Propose
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
