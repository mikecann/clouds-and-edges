import { useState } from "react";
import constate from "constate";

export interface AppState {
  userId?: string;
}

const hook = () => {
  const [state, setState] = useState<AppState>({});
  return [state, setState] as const;
};

export const [AppStateProvider, useAppState] = constate(hook);
