import { config } from "../config/config";
import { APIOperations } from "@project/shared/dist/api/api";
import { OperationInput, OperationOutput } from "@project/essentials";
import { API, ApiEndpointResponse } from "@project/shared";

export const performRPCOperation = async <TOperation extends APIOperations>(
  operation: TOperation,
  input: OperationInput<API, TOperation>
): Promise<OperationOutput<API, TOperation>> => {
  const response = await fetch(`${config.SERVER_ROOT}/api/v1`, {
    method: "POST",
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error(`apiQuery response not ok`);
  const json: ApiEndpointResponse<OperationOutput<API, TOperation>> = await response.json();
  if (json.kind != `success`) throw new Error(`API Endpoint Error '${json.message}'`);
  return json.payload;
};
