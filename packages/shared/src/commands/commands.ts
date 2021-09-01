import { UserCommand } from "./userCommand";
import { ProposalCommand } from "./proposalCommands";
import { MatchCommand } from "./matchCommand";

export type Commands = UserCommand | ProposalCommand | MatchCommand;
