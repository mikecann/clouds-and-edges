import { getRandom } from "./random";

/**
 * Note this was borrowed from: https://github.com/ai/nanoid/blob/main/non-secure/index.js
 */

// This alphabet uses `A-Za-z0-9_-` symbols. The genetic algorithm helped
// optimize the gzip compression for this alphabet.
const urlAlphabet = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW";

export const generateId = (rng = getRandom(), size = 21) => {
  let id = "";
  // A compact alternative for `for (var i = 0; i < step; i++)`.
  let i = size;
  while (i--) {
    // `| 0` is more compact and faster than `Math.floor()`.
    id += urlAlphabet[(rng.nextNumber() * 64) | 0];
  }
  return id;
};
