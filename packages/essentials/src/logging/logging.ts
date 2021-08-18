//import { Logger, ISettingsParam } from "tslog";

export const getLogger = (name: string) => ({
  log: (...args: any[]) => console.log(`[${name}]`, ...args),
  debug: (...args: any[]) => console.debug(`[${name}]`, ...args),
  info: (...args: any[]) => console.info(`[${name}]`, ...args),
  error: (...args: any[]) => console.error(`[${name}]`, ...args),
  warn: (...args: any[]) => console.warn(`[${name}]`, ...args),
});
