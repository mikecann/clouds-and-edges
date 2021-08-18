interface Options {
  event: Event;
  env: any;
}

export const onEventAddedToStore = async ({ event, env }: Options) => {
  // Todo automate calling the durable objects if they accept this kind of eveny
  // await callDurableObject({
  //   stub: env.UsersProjection.get(env.UsersProjection.idFromName(UsersProjection.version)),
  //   object: UsersProjection,
  //   endpoint: "onEvent",
  //   input: { event },
  // });
};
