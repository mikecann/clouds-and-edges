import { useMutation, useQueryClient } from "react-query";
import { useMe } from "./useMe";
import { ensure, wait } from "@project/essentials";
import { performCommand } from "./performCommand";

export const useSetName = () => {
  const { data: me } = useMe();
  const queryClient = useQueryClient();
  return useMutation(
    ({ name }: { name: string }) =>
      performCommand({
        aggregate: "user",
        command: "set-name",
        aggregateId: ensure(me).id,
        payload: { name },
      }),
    {
      onSuccess: async ({}) => {
        // Wait a sec then grab the new me
        await wait(200);
        await queryClient.invalidateQueries(`me`);
      },
    }
  );
};
