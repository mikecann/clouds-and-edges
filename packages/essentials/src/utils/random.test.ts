import { getRandom, setRandomSeed } from "./random";

it(`works`, () => {
  setRandomSeed(1);
  expect(getRandom()).toBe(0.8678360471967608);
  expect(getRandom()).toBe(0.6197745203971863);
  expect(getRandom()).toBe(0.39490225445479155);
});
