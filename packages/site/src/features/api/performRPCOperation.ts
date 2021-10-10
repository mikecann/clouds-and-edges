import { config } from "../config/config";
import { APIOperations, APIOperationInput, APIOperationOutput } from "@project/shared";
import { getLogger } from "@project/essentials";

const { log } = getLogger(`RPC`);

export const performRPCOperation =
  <TOperation extends APIOperations>(operation: TOperation, authToken?: string) =>
  async (input: APIOperationInput<TOperation>): Promise<APIOperationOutput<TOperation>> => {
    log(`fetching..`, { operation, input, authToken });
    const beforeTimestamp = Date.now();
    const response = await fetch(`${config.SERVER_ROOT}/api/v1/${operation}`, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
    });
    if (!response.ok) throw new Error(`${response.status} ${await response.text()}`);
    const json = await response.json();
    log(`fetched..`, { operation, json, authToken, deltaMs: Date.now() - beforeTimestamp });
    return json;
  };
