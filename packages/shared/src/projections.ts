import { MatchesProjections } from "./match/projections";
import { UsersProjections } from "./user/projections";

export type Projections = UsersProjections & MatchesProjections;
export type ProjectionKinds = keyof Projections;
