/***
 * This is all heavily borrowed from: https://github.com/babakness/exhaustive-type-checking/blob/master/src/index.ts
 */

type NonDistributiveMatchLeft<A, B, C> = [A] extends [B] ? C : never;
type NonDistributiveMatchBoth<A, B, C> = NonDistributiveMatchLeft<A, B, C> &
  NonDistributiveMatchLeft<B, A, C>;
type RecordOfFunctions<Out> = { [_ in string | number]: () => Out };

export const errorMessage = `Object does not have a function at the provided key`;

/**
 * A curried function that assists with exhaustive type checking.
 * @param obj - an object with functions for each key. Keys must cover all potential outcomes for `key`
 * @param key - key with a type union cover all keys of `obj`. Function stored at given value will run.
 * @example
 * const makeDessert = match({
 *   'banana': () => 'Banana Shake'
 *   'orange': () => 'Orange Juice'
 *   'mango': () => 'Mango Smoothie'
 *   'coconut': () => 'Coconut Ice Cream'
 * })
 */
export function match<Out, O extends RecordOfFunctions<Out>, K>(
  obj: O extends RecordOfFunctions<Out> ? O : O,
  key: K & NonDistributiveMatchBoth<K, keyof O, K> & keyof O
): Out;
export function match<Out, O extends RecordOfFunctions<Out>>(
  obj: O extends RecordOfFunctions<Out> ? O : O
): <K>(key: K & NonDistributiveMatchBoth<K, keyof O, K> & keyof O) => Out;
export function match<Out, O extends RecordOfFunctions<Out>, K>(
  obj: O extends RecordOfFunctions<Out> ? O : O,
  key?: K & NonDistributiveMatchBoth<K, keyof O, K> & keyof O
): ((key: keyof O) => Out) | Out {
  if (key === undefined) {
    return (key: keyof O) => {
      if (obj != null && typeof obj[key] === "function") {
        return obj[key]();
      } else {
        throw new Error(errorMessage);
      }
    };
  } else if (obj && typeof obj[key] === "function") {
    return obj[key]();
  } else {
    throw new Error(errorMessage);
  }
}

/**
 * An interface for describe an object which has keys matching the given type
 * @example
 * const fruitToDessert: MatchConfig<Fruit> = {
 *   'banana': () => 'Banana Shake'
 *   'orange': () => 'Orange Juice'
 *   'mango': () => 'Mango Smoothie'
 *   'coconut': () => 'Coconut Ice Cream'
 * }
 */
interface MatchConfig<Key extends string | number> {
  <Out>(obj: { [k in Key]: () => Out }): (key: Key) => Out;
  <Out>(obj: { [k in Key]: () => Out }, key: Key): Out;
}

/**
 * A function with a workaround for current TypeScript limitations.
 * The first function call is only to configure the union type
 * covered by all the keys of `obj`. Returns  curried function
 * that assists with exhaustive type checking.
 * @param obj - an object with functions for each key. Keys must cover all potential outcomes for `key`
 * @param key - key with a type union cover all keys of `obj`. Function stored at given value will run.
 * @example
 * const matchFruit = matchConfig<Fruit>()
 * const makeDessert = matchFruit({
 *   'banana': () => 'Banana Shake'
 *   'orange': () => 'Orange Juice'
 *   'mango': () => 'Mango Smoothie'
 *   'coconut': () => 'Coconut Ice Cream'
 * })
 */
export function matchConfig<Key extends string | number>(): MatchConfig<Key> {
  return function <Out>(obj: { [k in Key]: () => Out }, key?: Key) {
    if (key === undefined) {
      return <K2 extends keyof typeof obj>(key: K2) => {
        if (obj != null && typeof obj[key] === "function") {
          return obj[key]();
        } else {
          throw new Error(errorMessage);
        }
      };
    } else if (obj != null && typeof obj[key] === "function") {
      return obj[key]();
    } else {
      throw new Error(errorMessage);
    }
  };
}

/**
 * Provides exhaustive type checking
 * @param key - key with a type union cover all keys of `obj`. Function stored at given value will run.
 * @param obj - an object with functions for each key. Keys must cover all potential outcomes for `key`
 * @example
 * type Fruit = 'banana' | 'orange' | 'mango' | 'coconut'
 * function makeDessert( fruit: Fruit ) {
 *   return matchSwitch( fruit, {
 *     'banana': () => 'Banana Shake'
 *     'orange': () => 'Orange Juice'
 *     'mango': () => 'Mango Smoothie'
 *     'coconut': () => 'Coconut Ice Cream'
 *   }
 * }
 */
export function matchSwitch<Out, Key extends string | number = string | number>(
  key: Key,
  obj: { [k in Key]: () => Out }
): Out;
export function matchSwitch<Key extends string | number = string | number>(
  key: Key
): <Out>(obj: { [k in Key]: () => Out }) => Out;
export function matchSwitch<Out, Key extends string | number = string | number>(
  key: Key,
  obj?: { [k in Key]: () => Out }
): ((obj: { [k in Key]: () => Out }) => Out) | Out {
  if (obj != null && typeof obj[key] === "function") {
    return obj[key]();
  } else if (obj != null && key) {
    throw new Error(errorMessage);
  } else {
    return (obj: { [k in Key]: () => Out }) => {
      if (obj != null && typeof obj[key] === "function") {
        return obj[key]();
      } else {
        throw new Error(errorMessage);
      }
    };
  }
}

export type MatchRecord<Pos extends string, Out> = Record<Pos, () => Out>;
