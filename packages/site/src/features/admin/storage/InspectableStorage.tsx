import * as React from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spacer,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { ImSearch } from "react-icons/all";
import { KeyValueTable } from "./KeyValueTable";
import { useState } from "react";

export interface Props {
  contents: Record<string, unknown>;
  onQueryChange: (query: string) => unknown;
  onLimitChange: (limit: number) => unknown;
  onStartChange: (limit: number) => unknown;
}

export const InspectableStorage: React.FC<Props> = ({
  contents,
  onQueryChange,
  onLimitChange,
  onStartChange,
}) => {
  const [query, setQuery] = useState("");

  React.useEffect(() => {
    const id = setTimeout(() => {
      onQueryChange(query);
    }, 500);
    return () => clearTimeout(id);
  }, [query]);

  return (
    <VStack width={"100%"} spacing={5} alignItems="flex-start">
      <HStack spacing={5} alignItems="flex-start">
        <FormControl size="sm">
          <FormLabel>Key Prefix</FormLabel>
          <InputGroup size="sm" width={200}>
            <InputLeftElement pointerEvents="none" children={<ImSearch color="gray.300" />} />
            <Input
              type="tel"
              placeholder="Query"
              value={query}
              onChange={(e) => setQuery(e.currentTarget.value)}
            />
          </InputGroup>
        </FormControl>
        <FormControl size="sm">
          <FormLabel>Limit</FormLabel>
          <NumberInput
            size="sm"
            step={10}
            defaultValue={100}
            min={1}
            max={100}
            width={100}
            onChange={(e) => onLimitChange(parseInt(e))}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl size="sm">
          <FormLabel>Start</FormLabel>
          <NumberInput
            size="sm"
            step={1}
            defaultValue={0}
            min={0}
            width={100}
            onChange={(e) => onStartChange(parseInt(e))}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </HStack>
      <KeyValueTable data={Object.entries(contents)} />
    </VStack>
  );
};
