import { useQuery } from "react-query";
import { APIOperationOutput } from "@project/shared";
import { performRPCOperation } from "./performRPCOperation";

export const useEventStoreEvents = () => {
  return useQuery<APIOperationOutput<"event-store.events">, Error>(
    `event-store.events`,
    performRPCOperation("event-store.events")
  );
};
