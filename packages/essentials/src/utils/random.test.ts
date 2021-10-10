import { getRandom, setRandomSeed } from "./random";

it(`works`, () => {
  setRandomSeed(1);
  expect(getRandom()).toBe(0.000022477935999631882);
  expect(getRandom()).toBe(0.08503244863823056);
  expect(getRandom()).toBe(0.6013282160274684);
});
