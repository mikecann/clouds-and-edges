import { useAppState } from "../state/appState";

// For now the userId is the auth token, security FTW!
export const useAuthToken = () => useAppState()[0].userId;
