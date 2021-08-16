import { ApiEndpointResponse } from "@project/shared";

interface Options {
  path: string;
  input: unknown;
  method?: "POST" | "GET";
}

export const callApiEndpoint = async ({ path, input, method = "POST" }: Options): Promise<any> => {
  const response = await fetch(`http://localhost:8777/api/v1/${path}`, {
    method,
    body: input ? JSON.stringify(input) : undefined,
  });
  const json: ApiEndpointResponse = await response.json();
  if (json.kind != `success`) throw new Error(`API Endpoint Error '${json.message}'`);
  return json.payload;
};
