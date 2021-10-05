import * as React from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import ReactJson from "react-json-view";

interface Props {
  data: [key: string, value: any][];
}

export const KeyValueTable: React.FC<Props> = ({ data }) => {
  return (
    <Table variant="simple" size="sm" border="1px solid rgba(255,255,255,0.2)" borderRadius="4px">
      <Thead>
        <Tr>
          <Th>Key</Th>
          <Th>Value</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map(([key, value]) => (
          <Tr key={key}>
            <Td maxWidth={200} textOverflow={"ellipsis"}>
              {key}
            </Td>
            <Td maxWidth={400}>
              <ReactJson
                theme={"ocean"}
                src={value}
                collapseStringsAfterLength={80}
                enableClipboard={false}
                displayDataTypes={false}
                displayObjectSize={false}
                collapsed={true}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
