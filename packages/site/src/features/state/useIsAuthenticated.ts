import { useAppState } from "./appState";

export const useIsAuthenticated = () => {
  const [{ userId }] = useAppState();
  return userId != undefined;
};
