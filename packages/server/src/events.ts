import { UserEvent } from "./aggregates/user/events";
import { MatchEvent } from "./aggregates/match/events";

export type Events = UserEvent | MatchEvent;
