import { MatchProjection } from "@project/shared";
import { ensure } from "@project/essentials";

type UserIndex = Record<string, null>; // not sure if we can use a Set in DurableObjectStorage or not

export const createMatchesProjectionRepo = (storage: DurableObjectStorage) => {
  const getUserIndex = async (userId: string): Promise<UserIndex> =>
    (await storage.get<UserIndex>(`user:${userId}`)) ?? {};

  const addMatchToIndex = async (userId: string, matchId: string) => {
    const index = await getUserIndex(userId);
    await storage.put(`user:${userId}`, { ...index, [matchId]: null });
  };

  const removeMatchFromIndex = async (userId: string, matchId: string) => {
    const index = await getUserIndex(userId);
    delete index[matchId];
    await storage.put(`user:${userId}`, index);
  };

  const getUserMatches = async (userId: string): Promise<MatchProjection[]> => {
    const index = await getUserIndex(userId);
    return Promise.all(Object.keys(index).map(get));
  };

  const get = async (matchId: string) =>
    ensure(await storage.get<MatchProjection>(`match:${matchId}`));

  const put = async (match: MatchProjection) => {
    // Store the match
    await storage.put<MatchProjection>(`match:${match.id}`, match);

    // And update the "index" for the user's matches, this needs to be improved
    await addMatchToIndex(match.createdByUserId, match.id);
  };

  const update = async (matchId: string, toUpdate: Partial<MatchProjection>) => {
    const match = await get(matchId);
    await put({ ...match, ...toUpdate });

    // If we are adding the person that joined then we must update the index too
    if (toUpdate.joinedByUserId) await addMatchToIndex(toUpdate.joinedByUserId, match.id);
  };

  const remove = async (matchId: string) => {
    const match = await get(matchId);
    await storage.delete(matchId);
    await removeMatchFromIndex(match.createdByUserId, match.id);
    if (match.joinedByUserId) await removeMatchFromIndex(match.joinedByUserId, match.id);
  };

  return { get, getUserMatches, put, update, remove };
};

export type MatchesProjectionRepo = ReturnType<typeof createMatchesProjectionRepo>;
