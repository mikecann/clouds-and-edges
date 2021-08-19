import { ProjectionEventHandlers } from "@project/workers-es/dist";
import { Events } from "../../events";
import { getLogger } from "@project/essentials";

const logger = getLogger(`UsersProjection-handlers`);

export const getHandlers = (storage: DurableObjectStorage): ProjectionEventHandlers<Events> => ({
  "user-created": async ({ event: { aggregateId, payload } }) => {
    logger.debug(`UsersProjection user-created`, aggregateId, payload);
    await storage.put(`user:${aggregateId}`, {
      id: aggregateId,
      name: (payload as any).name,
    });
    logger.debug(`UsersProjection stored`);
  },
  "user-name-set": async ({ event: { payload, aggregateId } }) => {
    logger.debug(`UsersProjection user-name-set`, aggregateId, payload);
    const user = await storage.get(`user:${aggregateId}`);
    await storage.put(`user:${aggregateId}`, {
      ...(user as any),
      name: (payload as any).name,
    });
    logger.debug(`UsersProjection updated user`);
  },
});
