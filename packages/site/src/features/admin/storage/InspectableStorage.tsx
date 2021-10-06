import * as React from "react";
import {
  Button,
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
import { ImSearch, IoReloadOutline } from "react-icons/all";
import { KeyValueTable } from "./KeyValueTable";
import { useState } from "react";
import { useDebounce } from "../../../utils/useDebounce";

export interface Props {
  contents: Record<string, unknown>;
  onQueryChange: (query: string) => unknown;
  onLimitChange: (limit: number) => unknown;
  onStartChange: (start: string) => unknown;
  onReload: () => unknown;
  isLoading: boolean;
}

export const InspectableStorage: React.FC<Props> = ({
  contents,
  onQueryChange,
  onLimitChange,
  onStartChange,
  onReload,
  isLoading,
}) => {
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(100);
  const [start, setStart] = useState("");

  useDebounce(query, onQueryChange);
  useDebounce(limit, onLimitChange);
  useDebounce(start, onStartChange);

  return (
    <VStack width={"100%"} spacing={5} alignItems="flex-start">
      <Flex width={"100%"} justifyContent="flex-end" alignItems="flex-end">
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
              value={limit}
              min={1}
              max={100}
              width={100}
              onChange={(e) => setLimit(parseInt(e))}
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
            <InputGroup size="sm" width={200}>
              <InputLeftElement pointerEvents="none" children={<ImSearch color="gray.300" />} />
              <Input
                type="tel"
                placeholder="Query"
                value={start}
                onChange={(e) => setStart(e.currentTarget.value)}
              />
            </InputGroup>
          </FormControl>
        </HStack>
        <Spacer />
        <HStack>
          <Button size="sm" leftIcon={<IoReloadOutline />} isLoading={isLoading} onClick={onReload}>
            Reload Data
          </Button>
        </HStack>
      </Flex>
      <KeyValueTable data={Object.entries(contents)} />
    </VStack>
  );
};
