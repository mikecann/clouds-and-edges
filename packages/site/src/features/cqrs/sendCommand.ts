interface Options {
  aggregate: string;
  aggregateId: string;
  command: string;
  payload: unknown;
}

export const sendCommand = async ({ aggregate, aggregateId, command, payload }: Options) => {
  const response = await fetch(
    `http://localhost:8777/api/v1/command/${aggregate}/${aggregateId}/${command}`,
    { method: "POST", body: JSON.stringify(payload) }
  );
  const json = await response.text();
  console.log(json);
};
