export const config = {
  SERVER_ROOT: import.meta.env.VITE_SERVER_ROOT ?? `http://localhost:8777`,
  MODE: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
  SSR: import.meta.env.SSR,
  PROD: import.meta.env.PROD,
  BASE_URL: import.meta.env.BASE_URL,
};
