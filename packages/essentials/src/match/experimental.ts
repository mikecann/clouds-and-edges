/**
 * A message.
 */
export interface Message<T> {
  __: never;
  message: T;
}

/**
 * Catch-all type to express type errors.
 */
export interface VariantError<T> {
  __error: never;
  __message: T;
}

/**
 * Basic building block, the loose function signature.
 */
export type Func = (...args: any[]) => any;

/**
 * Prevents 'overflow' in a literal.
 */
export type Limited<T, U> = Exclude<keyof T, U> extends never
  ? T
  : VariantError<["Expected keys of handler", keyof T, "to be limited to possible keys", U]>;

/**
 * A set of functions meant to handle the variations of an object.
 */
type Handler<T extends Record<K, string>, K extends string> = {
  [P in T[K]]: (instance: Extract<T, Record<K, P>>) => any;
};
type AdvertiseDefault<T> = T & {
  /**
   * Adding a `default` value will make make this a partial match,
   * disabling exhaustiveness checking.
   */
  default?: Message<"Use this option to make the handling optional.">;
};

type WithDefault<T> = Partial<T> & {
  default: (instance: T) => any;
};

/**
 * Pick just the functions of an object.
 */
type FuncsOnly<T> = {
  [P in keyof T]: T[P] extends Func ? T[P] : never;
};

export type MatchFunc<K extends string> = {
  /**
   * Matchmaker, matchmaker, find me a match.
   * @param object
   * @param handler
   */
  match<T extends Record<K, string>, H extends AdvertiseDefault<Handler<T, K>>>(
    object: T,
    handler: H
  ): ReturnType<H[T[K]]>;
  /**
   * Matchmaker I'm desperate find me a partial match.
   * @param object
   * @param handler
   */
  match<T extends Record<K, string>, H extends WithDefault<Handler<T, K>>>(
    object: T,
    handler: Limited<H, T[K] | "default">
  ): ReturnType<FuncsOnly<H>[keyof H]>;
  /**
   * Matchmaker I'm very specific and I want to enumerate my remaining options.
   * @param object
   * @param handler
   * @param elseFunc
   */
  match<
    T extends Record<K, string>,
    H extends Partial<Handler<T, K>>,
    EF extends (instance: Exclude<T, Record<K, keyof H>>) => any
  >(
    object: T,
    handler: Limited<H, T[K]>,
    elseFunc: EF
  ): ReturnType<FuncsOnly<H>[keyof H]> | ReturnType<EF>;
};

export function matchImpl<K extends string>(key: K): MatchFunc<K> {
  function match<
    T extends Record<K, string>,
    H extends Handler<T, K>,
    EF extends (instance: Exclude<T, Record<K, keyof H>>) => any
  >(object: T, handler: H, elseFunc?: EF) {
    const type = object[key];

    if (type in handler) {
      return handler[type]?.(object as any); // TODO: Check if ?. is necessary.
    } else {
      if (elseFunc != undefined) {
        return elseFunc(object as any);
      } else if ("default" in handler) {
        return (handler as H & { default: (instance: T) => any }).default(object);
      }
    }
  }

  return { match };
}
