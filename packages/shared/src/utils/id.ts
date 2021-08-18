import { getRandom } from "./random";
import ShortId from "short-unique-id";

export const generateId = (rng = getRandom()): string => {
  return Date.now().toString(36) + rng.nextNumber().toString(36).substring(2);
};

const uid = new ShortId({});

export const generateShortId = (rng = getRandom()): string => {
  return generateId().substring(20);
  //return uid.stamp(24);
};
