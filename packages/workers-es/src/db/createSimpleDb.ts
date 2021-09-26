import { ensure } from "@project/essentials";

type EntityId = string;

interface Entity {
  id: EntityId;
}

interface Options {
  storage: DurableObjectStorage;
}

// todo: test this

export function createSimpleDb<TEntities extends Record<string, Entity>>({ storage }: Options) {
  const getKey = <TEntityName extends keyof TEntities>(
    entityName: TEntityName,
    entityId: EntityId
  ) => `${entityName}:${entityId}`;

  const find = async <TEntityName extends keyof TEntities>(
    entityName: TEntityName,
    entityId: EntityId
  ): Promise<TEntities[TEntityName] | undefined> => await storage.get(getKey(entityName, entityId));

  const get = async <TEntityName extends keyof TEntities>(
    entityName: TEntityName,
    entityId: EntityId
  ): Promise<TEntities[TEntityName]> => ensure(await find(entityName, entityId));

  const put = async <TEntityName extends keyof TEntities>(
    entityName: TEntityName,
    entity: TEntities[TEntityName]
  ) => {
    await storage.put(getKey(entityName, entity.id), entity);
  };

  const remove = async <TEntityName extends keyof TEntities>(
    entityName: TEntityName,
    entityId: EntityId
  ) => {
    await storage.delete(getKey(entityName, entityId));
  };

  return { find, get, put, remove };
}
