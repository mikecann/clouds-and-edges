import { UserCommands } from "./user/commands";
import { MatchCommands } from "./match/commands";

export interface Aggregates {
  user: UserCommands;
  match: MatchCommands;
}

export type AggregateKinds = keyof Aggregates;
