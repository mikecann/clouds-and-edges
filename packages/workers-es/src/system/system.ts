import { ensure } from "@project/essentials";
import { Env } from "../env";
import { createDurableObjectRPCProxy } from "../durableObjects/createDurableObjectRPCProxy";
import { BaseEventStore } from "../events/BaseEventStore";
import { AggreateDurableObject } from "../aggregates/AggreateDurableObject";
import { ProjectionDurableObject } from "../projections/ProjectionDurableObject";
import { ProcessDurableObject } from "../processes/ProcessDurableObject";

type Aggregates = Record<string, new (...args: any[]) => AggreateDurableObject>;
type Projections = Record<string, new (...args: any[]) => ProjectionDurableObject>;
type Processes = Record<string, new (...args: any[]) => ProcessDurableObject>;
type EventStore = new (...args: any[]) => BaseEventStore;

export interface ESSystemDefinition<
  TAggregates extends Aggregates = Aggregates,
  TProjections extends Projections = Projections,
  TProcesses extends Processes = Processes,
  TEventStore extends EventStore = EventStore
> {
  namespaces: {
    aggregates: TAggregates;
    projections: TProjections;
    processes: TProcesses;
    events: TEventStore;
  };
  version?: string;
}

export const createSystem = <
  TAggregates extends Aggregates = Aggregates,
  TProjections extends Projections = Projections,
  TProcesses extends Processes = Processes,
  TEventStore extends EventStore = EventStore
>({
  namespaces,
  version = `1`,
}: ESSystemDefinition<TAggregates, TProjections, TProcesses, TEventStore>): System<
  TAggregates,
  TProjections,
  TProcesses,
  TEventStore
> => {
  const getNamespace = (name: string, env: Env): DurableObjectNamespace =>
    ensure(
      env[name],
      `Could not find namespace '${name}' from the env, ensure you have typed it correctly`
    );

  const getAggregateNamespaceName = (name: keyof TAggregates): string =>
    ensure(
      namespaces.aggregates[name].name,
      `Unknown aggregate '${name}' make sure you have mapped it in your system`
    );

  const getProjectionNamespaceName = (name: keyof TProjections): string =>
    ensure(
      namespaces.projections[name].name,
      `Unknown projection '${name}' make sure you have mapped it in your system`
    );

  const getAggregateStub = (
    name: keyof TAggregates,
    env: Env,
    aggregateId: string
  ): DurableObjectStub => {
    const namespaceName = getAggregateNamespaceName(name);
    const namespace = getNamespace(namespaceName, env);
    return namespace.get(namespace.idFromString(aggregateId));
  };

  const getProjectionStub = (name: keyof TProjections, env: Env): DurableObjectStub => {
    const namespaceName = getProjectionNamespaceName(name);
    const namespace = getNamespace(namespaceName, env);
    return namespace.get(namespace.idFromName(version));
  };

  const getEventStoreStub = (env: Env): DurableObjectStub => {
    const namespace = getNamespace(namespaces.events.name, env);
    return namespace.get(namespace.idFromString(version));
  };

  const getEventStore = (env: Env): InstanceType<TEventStore> =>
    createDurableObjectRPCProxy(
      namespaces.events,
      getEventStoreStub(env)
    ) as InstanceType<TEventStore>;

  const getAggregate = <T extends keyof TAggregates>(
    name: T,
    env: Env,
    aggregateId: string
  ): InstanceType<TAggregates[T]> =>
    createDurableObjectRPCProxy(
      namespaces.aggregates[name],
      getAggregateStub(name, env, aggregateId)
    ) as InstanceType<TAggregates[T]>;

  const getProjection = <T extends keyof TProjections>(
    name: T,
    env: Env
  ): InstanceType<TProjections[T]> =>
    createDurableObjectRPCProxy(
      namespaces.projections[name],
      getProjectionStub(name, env)
    ) as InstanceType<TProjections[T]>;

  return {
    getNamespace,
    getAggregateNamespaceName,
    getAggregateStub,
    getEventStoreStub,
    getEventStore,
    getProjection,
    getAggregate,
  };
};

export interface System<
  TAggregates extends Aggregates = Aggregates,
  TProjections extends Projections = Projections,
  TProcesses extends Processes = Processes,
  TEventStore extends EventStore = EventStore
> {
  getNamespace: (name: string, env: Env) => DurableObjectNamespace;
  getAggregateNamespaceName: (name: keyof TAggregates) => string;
  getEventStoreStub: (env: Env) => DurableObjectStub;
  getAggregateStub: (name: keyof TAggregates, env: Env, aggregateId: string) => DurableObjectStub;
  getEventStore: (env: Env) => InstanceType<TEventStore>;
  getProjection: <T extends keyof TProjections>(name: T, env: Env) => InstanceType<TProjections[T]>;
  getAggregate: <T extends keyof TAggregates>(
    name: T,
    env: Env,
    aggregateId: string
  ) => InstanceType<TAggregates[T]>;
}
