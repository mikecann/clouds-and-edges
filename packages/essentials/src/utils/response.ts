export interface Success<T> {
  kind: `success`;
  payload: T;
}

export interface Fail {
  kind: `fail`;
  message: string;
}
