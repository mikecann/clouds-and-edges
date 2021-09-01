export function wait(ms: number) {
  return new Promise((resolve, reject) => setTimeout(resolve, ms));
}

export const iife = <T>(fn: () => T): T => fn();

export function leftFillNum(num: number, targetLength: number) {
  return num.toString().padStart(targetLength, "0");
}
