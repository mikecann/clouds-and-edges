import { OpenMatchProjection } from "@project/shared";
import { ensure } from "@project/essentials";

export const createOpenMatchesProjection = (storage: DurableObjectStorage) => {
  const get = async (matchId: string) =>
    ensure(await storage.get<OpenMatchProjection>(`match:${matchId}`));

  const put = async (match: OpenMatchProjection) => {
    // Store the match
    await storage.put<OpenMatchProjection>(`match:${match.id}`, match);
  };

  const update = async (matchId: string, toUpdate: Partial<OpenMatchProjection>) => {
    const match = await get(matchId);
    await put({ ...match, ...toUpdate });
  };

  const remove = async (matchId: string) => {
    await storage.delete(`match:${matchId}`);
  };

  const list = async (limit = 10): Promise<OpenMatchProjection[]> => {
    const contents = await storage.list<OpenMatchProjection>({ prefix: `match:`, limit });
    return Array.from(contents.values());
  };

  return { get, list, put, update, remove };
};

export type OpenMatchesProjectionRepo = ReturnType<typeof createOpenMatchesProjection>;
