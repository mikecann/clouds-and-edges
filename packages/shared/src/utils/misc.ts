export function wait(ms: number) {
  return new Promise((resolve, reject) => setTimeout(resolve, ms));
}