export const ensureNotUndefined = <T>(
  obj: T | undefined,
  err = `variable was undefined when it shouldnt have been.`
): T => {
  if (obj === undefined) throw new Error(err);
  return obj;
};

export const ensureNotNull = <T>(
  obj: T | null,
  err = `variable was null when it shouldnt have been.`
): T => {
  if (obj === null) throw new Error(err);
  return obj;
};

export const ensure = <T>(
  obj: T | undefined | null,
  err = `variable was undefined or null when it shouldnt have been.`
): T => {
  obj = ensureNotUndefined(obj, err);
  obj = ensureNotNull(obj, err);
  return obj;
};

export const ensureNotUndefinedFP = (
  err: string = `variable was undefined when it shouldnt have been.`
) => <T>(obj: T | undefined): T => {
  if (obj === undefined) throw new Error(err);
  return obj;
};

export const ensureFP = ensureNotUndefinedFP;
