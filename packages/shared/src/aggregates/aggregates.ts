import { ProposalCommand } from "../commands/proposalCommands";
import { UserCommand } from "../commands/userCommand";
import { MatchCommand } from "../commands/matchCommand";

export interface Aggregates {
  user: UserCommand;
  proposal: ProposalCommand;
  match: MatchCommand;
}

export type AggregateKinds = keyof Aggregates;
