import { AggregateNames } from "@project/shared";
import { z } from "zod";

export interface AddEventInput {
  kind: string;
  payload?: unknown;
}
