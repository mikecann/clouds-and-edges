import * as React from "react";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  VStack,
} from "@chakra-ui/react";
import { EventItem } from "./EventItem";
import { StoredEvent } from "@project/workers-es";

interface Props {
  event: StoredEvent;
}

export const LogEntry: React.FC<Props> = ({ event }) => {
  return (
    <AccordionItem fontFamily={"monospace"}>
      <AccordionButton>
        <Box flex="1" maxWidth={"100%"} textAlign="left" textOverflow={"ellipsis"}>
          {event.id}
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4} maxWidth={"100%"}>
        <VStack
          alignItems={"flex-start"}
          backgroundColor={"rgba(0,0,0,0.3)"}
          color={"gray.300"}
          padding={5}
          borderRadius={6}
          maxWidth={"100%"}
        >
          <EventItem label={"id"} value={event.id} />
          <EventItem label={"aggregate"} value={event.aggregate} />
          <EventItem label={"aggregateId"} value={event.aggregateId} />
          <EventItem label={"kind"} value={event.kind} />
          <EventItem label={"timestamp"} value={event.timestamp} />
          <EventItem label={"payload"} value={JSON.stringify(event.payload)} />
        </VStack>
      </AccordionPanel>
    </AccordionItem>
  );
};
