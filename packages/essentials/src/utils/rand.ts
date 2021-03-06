import { getRandom } from "./random";

export const randomIndex = <T>(items: T[]): number => Math.floor(getRandom() * items.length);

export const randomOne = <T>(items: T[]): T => items[randomIndex(items)];
