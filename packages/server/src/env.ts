export interface Env {
  [key: string]: DurableObjectNamespace;
  UserAggregate: DurableObjectNamespace;
  ProposalAggregate: DurableObjectNamespace;
  MatchAggregate: DurableObjectNamespace;

  EventStore: DurableObjectNamespace;

  UsersProjection: DurableObjectNamespace;
  ProposalsProjection: DurableObjectNamespace;
  MatchesProjection: DurableObjectNamespace;

  ProposalJoiningProcess: DurableObjectNamespace;
}
