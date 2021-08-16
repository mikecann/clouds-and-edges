import { commands } from "./commands";
import { reducers } from "./reducers";
import { UserAggregateState } from "./state";
import { AggreateDO } from "../../lib/AggregateDO";

export class UserAggregate extends AggreateDO<UserAggregateState> {
  constructor(objectState: DurableObjectState) {
    super(objectState, commands as any, reducers as any);
  }
}
