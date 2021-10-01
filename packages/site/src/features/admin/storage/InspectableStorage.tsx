import * as React from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { ImSearch } from "react-icons/all";
import ReactJson from "react-json-view";
import { KeyValueTable } from "./KeyValueTable";

export interface Props {
  contents: Record<string, unknown>;
}

export const InspectableStorage: React.FC<Props> = ({ contents }) => {
  return (
    <VStack width={"100%"}>
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={<ImSearch color="gray.300" />} />
        <Input type="tel" placeholder="Query" />
      </InputGroup>
      <KeyValueTable data={Object.entries(contents)} />
    </VStack>
  );
};
