import { ApiEndpointResponse } from "@project/shared";
import {config} from '../config/config';

interface Options {
  path: string;
  input: unknown;
  method?: "POST" | "GET";
}

export const callApiEndpoint = async ({ path, input, method = "POST" }: Options): Promise<any> => {
  const response = await fetch(`${config.SERVER_ROOT}/api/v1/${path}`, {
    method,
    body: input ? JSON.stringify(input) : undefined,
  });
  const json: ApiEndpointResponse = await response.json();
  if (json.kind != `success`) throw new Error(`API Endpoint Error '${json.message}'`);
  return json.payload;
};
