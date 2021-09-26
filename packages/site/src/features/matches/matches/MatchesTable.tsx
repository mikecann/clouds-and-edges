import * as React from "react";
import { MatchProjection } from "@project/shared";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

interface Props {
  matches: MatchProjection[];
  onCancel?: () => any;
  onJoin?: () => any;
  onOpen?: () => any;
  isLoading: boolean;
}

export const MatchesTable: React.FC<Props> = ({ matches }) => {
  return (
    <Table size="sm">
      <Thead>
        <Tr>
          <Th>Created At</Th>
          <Th>Size</Th>
          <Th isNumeric>multiply by</Th>
        </Tr>
      </Thead>
      <Tbody>
        {matches.map((match) => (
          <Tr>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
            <Td isNumeric>25.4</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
