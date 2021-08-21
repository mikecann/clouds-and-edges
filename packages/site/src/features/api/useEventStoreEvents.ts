import { useQuery } from "react-query";
import { APIOperationOutput } from "@project/shared";
import { performRPCOperation } from "./performRPCOperation";
import { useAppState } from "../state/appState";

export const useEventStoreEvents = () => {
  const [{ userId }] = useAppState();
  return useQuery<APIOperationOutput<"event-store.events">, Error>(
    `event-store.events`,
    performRPCOperation("event-store.events", userId)
  );
};
