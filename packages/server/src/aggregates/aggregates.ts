import { AggregateNames } from "@project/shared";
import { Env } from "../env";

export const aggregates: Record<AggregateNames, keyof Env> = {
  user: `UserAggregate`,
};
