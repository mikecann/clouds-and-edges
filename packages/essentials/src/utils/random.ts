import { PRNG } from "./prng";

let random = new PRNG();

export const getRandom = () => {
  const rng = random.next();
  return rng;
};

export const setRandomSeed = (seed: number) => {
  random = new PRNG([seed, seed, seed, seed]);
};
