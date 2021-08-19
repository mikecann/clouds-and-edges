export interface Success<T = unknown> {
  kind: `success`;
  payload: T;
}

export interface Fail {
  kind: `fail`;
  message: string;
}

export type Result<T = unknown> = Success<T> | Fail;
