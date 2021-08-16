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
