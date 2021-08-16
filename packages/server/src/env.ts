import {UsersProjection} from './projections/users/UsersProjection';

export interface Env {
  UserAggregate: DurableObjectNamespace;
  EventStore: DurableObjectNamespace;
  UsersProjection: DurableObjectNamespace;
}