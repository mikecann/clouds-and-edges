import { Env } from "../../env";
import { UsersProjection } from "../../projections/users/UsersProjection";
import { callDurableObject } from "../durableObjects/callDurableObject";
import { Event } from "./events";

interface Options {
  event: Event;
  env: Env;
}

export const onEventAddedToStore = async ({ event, env }: Options) => {
  // Todo automate calling the durable objects if they accept this kind of eveny

  await callDurableObject({
    stub: env.UsersProjection.get(env.UsersProjection.idFromName(UsersProjection.version)),
    object: UsersProjection,
    endpoint: "onEvent",
    input: { event },
  });
};
