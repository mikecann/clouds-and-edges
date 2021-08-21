import * as React from "react";
import { ProjectionAdminState } from "@project/workers-es";
import { Button, Code, Table, Tbody, Td, Th, Thead, Tr, VStack } from "@chakra-ui/react";

export interface ProjectionInfoProps {
  adminState: ProjectionAdminState;
  storageContents: Record<string, any>;
  onRebuild: () => any;
}

export const ProjectionInfo: React.FC<ProjectionInfoProps> = ({
  adminState,
  onRebuild,
  storageContents,
}) => {
  return (
    <VStack>
      <Code>{JSON.stringify(adminState)}</Code>
      <Button onClick={onRebuild}>Rebuild</Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Key</Th>
            <Th>Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.entries(storageContents).map(([key, value]) => (
            <Tr>
              <Td maxWidth={400}>{key}</Td>
              <Td maxWidth={400}>{JSON.stringify(value)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </VStack>
  );
};
