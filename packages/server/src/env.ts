export interface Env {
  [key: string]: DurableObjectNamespace;
  UserAggregate: DurableObjectNamespace;
  MatchAggregate: DurableObjectNamespace;

  EventStore: DurableObjectNamespace;

  UsersProjection: DurableObjectNamespace;
  MatchesProjection: DurableObjectNamespace;

  MatchCreationProcess: DurableObjectNamespace;
  MatchJoiningProcess: DurableObjectNamespace;
}
