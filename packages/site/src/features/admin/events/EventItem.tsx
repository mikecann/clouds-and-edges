import * as React from "react";
import { HStack, Text } from "@chakra-ui/react";

interface Props {
  label: React.ReactNode;
  value: React.ReactNode;
}

export const EventItem: React.FC<Props> = ({ label, value }) => {
  return (
    <HStack spacing={10} alignItems={"flex-start"} flex={1}>
      <Text fontWeight={"bold"} width={90}>
        {label}:{" "}
      </Text>
      <Text flex={"1"}>{value}</Text>
    </HStack>
  );
};
