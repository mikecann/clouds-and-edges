import { ApiEndpointResponse, QueryOutput } from "@project/shared";
import { config } from "../config/config";
import { QueryNames, QueryInput } from "@project/shared";

export const apiQuery = async <TQuery extends QueryNames>(
  endpoint: TQuery,
  input: QueryInput<TQuery>
): Promise<QueryOutput<TQuery>> => {
  const response = await fetch(`${config.SERVER_ROOT}/api/v1/query/${endpoint}`, {
    method: "POST",
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error(`apiQuery response not ok`);
  const json: ApiEndpointResponse<QueryOutput<TQuery>> = await response.json();
  if (json.kind != `success`) throw new Error(`API Endpoint Error '${json.message}'`);
  return json.payload;
};
