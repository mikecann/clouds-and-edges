//import { Logger, ISettingsParam } from "tslog";

export const getLogger = (name: string): Logger => ({
  log: (...args: any[]) => console.log(`[${name}]`, ...args),
  debug: (...args: any[]) => console.debug(`[${name}]`, ...args),
  info: (...args: any[]) => console.info(`[${name}]`, ...args),
  error: (...args: any[]) => console.error(`[${name}]`, ...args),
  warn: (...args: any[]) => console.warn(`[${name}]`, ...args),
});

export interface Logger {
  log: (...args: any[]) => void;
  debug: (...args: any[]) => void;
  info: (...args: any[]) => void;
  error: (...args: any[]) => void;
  warn: (...args: any[]) => void;
}

export const nullLogger: Logger = {
  log: () => {},
  debug: () => {},
  info: () => {},
  error: () => {},
  warn: () => {},
};
