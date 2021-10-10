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

type NamespaceCategories = keyof ESSystemDefinition["namespaces"];

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

  const getNamespaceName = <TCategory extends NamespaceCategories>(
    category: TCategory,
    name: ESSystemDefinition["namespaces"][TCategory]
  ): string =>
    ensure(
      (namespaces[category] as any)[name],
      `Unknown ${category} '${name}' make sure you have mapped it in your system (e.g. namespaces.${category}.${name})`
    ).name;

  const getAggregateNamespaceName = (name: keyof TAggregates) =>
    getNamespaceName("aggregates", name as any);

  const getStub = <TCategory extends NamespaceCategories>(
    category: TCategory,
    name: keyof TCategory,
    env: Env,
    aggregateId?: string
  ): DurableObjectStub => {
    const namespaceName = getNamespaceName(category, name as any);
    const namespace = getNamespace(namespaceName, env);
    return namespace.get(
      aggregateId ? namespace.idFromString(aggregateId) : namespace.idFromName(version)
    );
  };

  const getAggregateStub = (
    name: keyof TAggregates,
    env: Env,
    aggregateId: string
  ): DurableObjectStub => getStub("aggregates", name as any, env, aggregateId);

  const getProjectionStub = (name: keyof TProjections, env: Env): DurableObjectStub =>
    getStub("projections", name as any, env);

  const getEventStoreStub = (env: Env): DurableObjectStub => {
    const namespace = getNamespace(namespaces.events.name, env);
    return namespace.get(namespace.idFromName(version));
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
      getStub("aggregates", name as any, env, aggregateId)
    ) as InstanceType<TAggregates[T]>;

  const getProjection = <T extends keyof TProjections>(
    name: T,
    env: Env
  ): InstanceType<TProjections[T]> =>
    createDurableObjectRPCProxy(
      namespaces.projections[name],
      getProjectionStub(name, env)
    ) as InstanceType<TProjections[T]>;

  const getProcess = <T extends keyof TProcesses>(name: T, env: Env): InstanceType<TProcesses[T]> =>
    createDurableObjectRPCProxy(
      namespaces.processes[name],
      getStub("processes", name as any, env)
    ) as InstanceType<TProcesses[T]>;

  const getReadModels = (
    env: Env
  ): (InstanceType<TProcesses[string]> | InstanceType<TProjections[string]>)[] => {
    const projections = Object.keys(namespaces.projections).map((name) => getProjection(name, env));
    const processes = Object.keys(namespaces.processes).map((name) => getProcess(name, env));
    return [...projections, ...processes];
  };

  return {
    getNamespace,
    getAggregateNamespaceName,
    getAggregateStub,
    getEventStoreStub,
    getEventStore,
    getProjection,
    getProcess,
    getAggregate,
    getReadModels,
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
  getProcess: <T extends keyof TProcesses>(name: T, env: Env) => InstanceType<TProcesses[T]>;
  getReadModels: (
    env: Env
  ) => (InstanceType<TProcesses[string]> | InstanceType<TProjections[string]>)[];
  getAggregate: <T extends keyof TAggregates>(
    name: T,
    env: Env,
    aggregateId: string
  ) => InstanceType<TAggregates[T]>;
}
