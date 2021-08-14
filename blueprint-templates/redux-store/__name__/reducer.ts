import { createReducer } from "typesafe-actions";
import { defaultState, {{pascalCase name}}State, {{pascalCase name}}Actions } from "./types";
import { set{{pascalCase name}} } from "./actions";
import { update } from "typescript-immutable-utils";

export const reducer = createReducer<{{pascalCase name}}State, {{pascalCase name}}Actions>(defaultState()).handleAction(
  set{{pascalCase name}},
  (state, {payload}) => update(state, { {{name}}: payload })
);
