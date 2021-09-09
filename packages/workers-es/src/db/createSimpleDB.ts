import { ensure } from "@project/essentials";

interface Entity {
  id: string;
}

interface Options<TEntity extends Entity, TIndices extends Record<keyof TEntity, null>> {
  storage: DurableObjectStorage;
  indices: TIndices;
}

export function createSimpleDB<
  TEntity extends Entity,
  TIndices extends Record<keyof TEntity, null>
>({ indices, storage }: Options<TEntity, TIndices>) {
  const find = async (id: string): Promise<TEntity | undefined> =>
    await storage.get<TEntity>(`__entity:${id}`);

  const get = async (id: string): Promise<TEntity> => ensure(await find(id));

  const updateIndices = async (entity: TEntity) => {
    await Promise.all(
      Object.keys(indices).map((key) =>
        storage.put(`${key}:${(entity as any)[key]}:${entity.id}`, entity.id)
      )
    );
  };

  const put = async (entity: TEntity) => {
    await storage.put(`__entity:${entity.id}`, entity);
    await updateIndices(entity);
  };

  const update = async (id: string, updater: (entity: TEntity) => Promise<TEntity> | TEntity) => {
    const entity = await get(id);
    const updated = await updater(entity);
    await put(updated);
    await updateIndices(entity);
  };

  const query = async (
    index: keyof TIndices,
    value: string,
    options: { limit?: number; start?: string; end?: string }
  ): Promise<TEntity[]> => {
    const entries = await storage.list({ prefix: `${index}:${value}`, ...options });
    return Promise.all(Object.values(entries).map(get));
  };

  return { find, get, put, update, query };
}
