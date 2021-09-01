import { ensure } from "@project/essentials";
import { Env } from "../env";
import { createDurableObjectRPCProxy } from "../durableObjects/createDurableObjectRPCProxy";
import { BaseEventStore } from "../events/BaseEventStore";

export interface ESSystemDefinition {
  namespaces: {
    aggregates: Record<string, string>;
    projections: Record<string, string>;
    processes: Record<string, string>;
    events: string;
  };
  version?: string;
}

export const createSystem = ({ namespaces, version = `1` }: ESSystemDefinition) => {
  const getNamespace = (name: string, env: Env): DurableObjectNamespace =>
    ensure(
      env[name],
      `Could not find namespace '${name}' from the env, ensure you have typed it correctly`
    );

  const getAggregateNamespaceName = (name: string) =>
    ensure(
      namespaces.aggregates[name],
      `Unkown aggregate '${name}' make sure you have mapped it in your system`
    );

  const getAggregateStub = (name: string, env: Env, aggregateId: string): DurableObjectStub => {
    const namespaceName = getAggregateNamespaceName(name);
    const namespace = getNamespace(namespaceName, env);
    return namespace.get(namespace.idFromName(aggregateId));
  };

  const getEventStoreStub = (env: Env): DurableObjectStub => {
    const namespace = getNamespace(namespaces.events, env);
    return namespace.get(namespace.idFromString(version));
  };

  const getEventStore = (env: Env) =>
    createDurableObjectRPCProxy(BaseEventStore, getEventStoreStub(env));

  return {
    getNamespace,
    getAggregateStub,
    getEventStoreStub,
    getEventStore,
  };
};

export type System = ReturnType<typeof createSystem>;
