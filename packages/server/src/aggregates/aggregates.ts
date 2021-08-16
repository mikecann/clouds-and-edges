import { AggregateNames } from "@project/shared";
import { EnvInterface } from "../env";

export const aggregates: Record<AggregateNames, keyof EnvInterface> = {
  user: `UserAggregate`,
};
