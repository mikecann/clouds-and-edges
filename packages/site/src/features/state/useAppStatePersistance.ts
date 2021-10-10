import { useAppState } from "./appState";
import { useEffect } from "react";

export const useAppStatePersistance = () => {
  const [{ userId }, setAppState] = useAppState();

  // Depersist the storage on init
  useEffect(() => {
    setAppState((p) => ({ ...p, userId: localStorage.getItem(`userId`) ?? undefined }));
  }, []);

  // If the state changes then persist it
  useEffect(() => {
    if (userId) localStorage.setItem(`userId`, userId);
  }, [userId]);
};
