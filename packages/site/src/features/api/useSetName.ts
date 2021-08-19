export const useSetName = () => {
  return {} as any;
  // const { data: me } = useMe();
  // const queryClient = useQueryClient();
  // return useMutation(
  //   ({ name }: { name: string }) =>
  //     apiMutate("command", {
  //       aggregate: "user",
  //       command: "set-name",
  //       aggregateId: ensure(me).id,
  //       payload: { name },
  //     }),
  //   {
  //     onSuccess: async () => {
  //       // Wait a sec then grab the new me
  //       await wait(200);
  //       queryClient.invalidateQueries(`me`);
  //     },
  //   }
  // );
};
