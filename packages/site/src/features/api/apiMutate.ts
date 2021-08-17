import { ApiEndpointResponse, MutationNames, MutationOutput, MutationInput } from "@project/shared";
import { config } from "../config/config";

export const apiMutate = async <TMutation extends MutationNames>(
  endpoint: TMutation,
  input: MutationInput<TMutation>
): Promise<MutationOutput<TMutation>> => {
  console.log(`calling API mutate`, { endpoint, input });
  const response = await fetch(`${config.SERVER_ROOT}/api/v1/mutation/${endpoint}`, {
    method: "POST",
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error(`apiQuery response not ok`);
  const json: ApiEndpointResponse<MutationOutput<TMutation>> = await response.json();
  if (json.kind != `success`) throw new Error(`API Endpoint Error '${json.message}'`);
  return json.payload;
};
