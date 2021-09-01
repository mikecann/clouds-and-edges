import { UserEvent } from "./aggregates/user/events";
import { ProposalEvent } from "./aggregates/proposal/events";
import { MatchEvent } from "./aggregates/match/events";

export type Events = UserEvent | ProposalEvent | MatchEvent;
