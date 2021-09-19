import { config } from "../config/config";
import { APIOperations , APIOperationInput, APIOperationOutput } from "@project/shared";

export const performRPCOperation =
  <TOperation extends APIOperations>(operation: TOperation, authToken?: string) =>
  async (input: APIOperationInput<TOperation>): Promise<APIOperationOutput<TOperation>> => {
    const response = await fetch(`${config.SERVER_ROOT}/api/v1/${operation}`, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
    });
    if (!response.ok) throw new Error(`${response.status} ${await response.text()}`);
    return await response.json();
  };
