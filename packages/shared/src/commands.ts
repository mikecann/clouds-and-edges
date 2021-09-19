import { UserCommands } from "./user/commands";
import { MatchCommands } from "./match/commands";

export type Commands = UserCommands | MatchCommands;
