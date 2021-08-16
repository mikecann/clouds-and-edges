import { getRandom } from "./random";

export const generateId = (rng = getRandom()): string => {
  return (
    Date.now().toString(36) +
    rng
      .nextNumber()
      .toString(36)
      .substring(2)
  );
};

export const generateShortId = (rng = getRandom()): string => {
  return generateId(rng).substring(0, 16);
};
