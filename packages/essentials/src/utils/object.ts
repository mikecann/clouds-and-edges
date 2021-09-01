export const getInObj = function <T extends Record<string, any>, U extends string>(
  obj: T,
  key: U
): any {
  if (key in obj == false) {
    const keys = Object.keys(obj);
    throw new Error(
      `Cannot get '${key}' from the given object, the property doesnt exist in the given object. Other properties that do exist are: '${
        keys.length > 20
          ? keys.slice(0, 20).join(", ") + ` ... <${keys.length - 20} more>`
          : keys.slice(0, 20).join(", ")
      }'`
    );
  }

  return (obj as any)[key];
};

export const findInObj = function <T extends Record<string, any>, U extends string>(
  obj: T,
  key: U
): any {
  return (obj as any)[key];
};

// export const recordFromUnion = <T extends { kind: string }>(kindables: T[]): Record<string, T> => {
//   const obj: any = {};
//   for(let kindable of kindables)
//       obj[kindable.kind] =
// }

export const clone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));
