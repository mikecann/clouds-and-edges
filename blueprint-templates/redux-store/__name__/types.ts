import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { validate as _validate } from "@battletabs/essentials";
import * as t from "io-ts";

export type {{pascalCase name}}Actions = ActionType<typeof actions>;

export const {{name}}Codec = t.strict({
  {{name}}: t.record(t.string, t.any)
});

export interface {{pascalCase name}}State extends t.TypeOf<typeof {{name}}Codec> {}

const encode = (s: {{pascalCase name}}State) => {{name}}Codec.encode(s);

export const validate = (s?: Partial<{{pascalCase name}}State>): {{pascalCase name}}State =>
  _validate<{{pascalCase name}}State>(
    {{name}}Codec,
    encode({
      {{name}}: s?.{{name}} ?? {},
    })
  );

export const defaultState = () => validate();
