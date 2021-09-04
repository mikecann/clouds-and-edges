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

export interface Props {
  contents: Record<string, unknown>;
}

export const InspectableStorage: React.FC<Props> = ({ contents }) => {
  return (
    <VStack>
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={<ImSearch color="gray.300" />} />
        <Input type="tel" placeholder="Query" />
      </InputGroup>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Key</Th>
            <Th>Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.entries(contents).map(([key, value]) => (
            <Tr key={key}>
              <Td maxWidth={400}>{key}</Td>
              <Td maxWidth={400}>{JSON.stringify(value)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </VStack>
  );
};
