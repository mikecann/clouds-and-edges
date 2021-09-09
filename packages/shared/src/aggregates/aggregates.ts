import { UserCommand } from "../commands/userCommand";
import { MatchCommand } from "../commands/matchCommand";

export interface Aggregates {
  user: UserCommand;
  match: MatchCommand;
}

export type AggregateKinds = keyof Aggregates;
