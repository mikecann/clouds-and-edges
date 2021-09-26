import { ProcessEventHandlers } from "@project/workers-es";
import { Events } from "../../events";
import { getLogger } from "@project/essentials";
import { Commands } from "@project/shared";
import { Db } from "./db";

const logger = getLogger(`UsersProjection-handlers`);

// Todo: handle active match incrementing and decrementing in here
// Todo: handle match join rejection too

export const getHandlers = (db: Db): ProcessEventHandlers<Events, Commands> => ({
  handlers: {
    // Remember this user
    "user-created": async ({ event }) => {
      await db.put("user", {
        id: event.aggregateId,
        name: event.payload.name,
        activeMatches: 0,
        avatar: event.payload.avatar,
        color: event.payload.color,
      });
    },

    // Remember if they change their name
    "user-name-set": async ({ event }) => {
      await db.put("user", {
        ...(await db.get("user", event.aggregateId)),
        name: event.payload.name,
      });
    },

    "match-join-requested": async ({ event, effects }) => {
      // Lets grab the user that wants to join from storage
      const user = await db.get("user", event.payload.userId);

      // User may only join if they have a max of 3 matches
      if (user.activeMatches > 3) return;

      // First we join the player to the match
      await effects.executeCommand({
        aggregate: "match",
        kind: "join",
        payload: {
          userId: user.id,
          name: user.name,
          color: user.color,
          avatar: user.avatar,
        },
      });
    },
  },
  effects: {
    sendEmail: (toUserId: string) => {
      // todo
    },
  },
});
