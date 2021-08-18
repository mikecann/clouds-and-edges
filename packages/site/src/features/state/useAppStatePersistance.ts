import { useAppState } from "./appState";
import { useEffect } from "react";

export const useAppStatePersistance = () => {
  const [{ userId }, setAppState] = useAppState();
  useEffect(() => {
    if (userId) localStorage.setItem(`userId`, userId);
  }, [userId]);
  useEffect(() => {
    setAppState((p) => ({ ...p, userId: localStorage.getItem(`userId`) ?? undefined }));
  }, []);
};
