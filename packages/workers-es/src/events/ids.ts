// This key is super important
// We use leftFillNum to ensure lexographically incrementing keys when we retrieve events when rebuilding
import { leftFillNum } from "@project/essentials";

const prefix = `e:`;

export const getEventId = (index: number) => `${prefix}${leftFillNum(index, 9)}`;

export const eventIndexFromId = (id: string): number => {
  const parts = id.split(`e:`);
  if (parts.length != 2) throw new Error(`cannot get event index from the id '${id}'`);
  return parseInt(parts[1]);
};

export const getNextEventId = (id: string): string => getEventId(eventIndexFromId(id) + 1);
