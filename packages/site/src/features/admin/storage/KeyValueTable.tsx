import * as React from "react";
import { Table, Tbody, Td, Th, Thead, Tr, Text } from "@chakra-ui/react";
import ReactJson from "react-json-view";

interface Props {
  data: [key: string, value: any][];
}

export const KeyValueTable: React.FC<Props> = ({ data }) => {
  return (
    <Table
      variant="simple"
      size="sm"
      border="1px solid rgba(255,255,255,0.2)"
      borderRadius="4px"
      width="100%"
    >
      <Thead>
        <Tr>
          <Th>Key</Th>
          <Th>Value</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map(([key, value]) => (
          <Tr key={key}>
            <Td>
              <Text isTruncated={true}>{key}</Text>
            </Td>
            <Td>
              <ReactJson
                theme={"ocean"}
                src={value ?? {}}
                collapseStringsAfterLength={80}
                enableClipboard={false}
                displayDataTypes={false}
                displayObjectSize={false}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
