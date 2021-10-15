export type Processes = {
  matchJoining: Record<string, never>;
  matchCreation: Record<string, never>;
};

export type ProcessKinds = keyof Processes;
