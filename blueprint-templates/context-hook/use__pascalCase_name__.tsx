import createContainer from "constate";
import { useContext } from "react";

const {log, error, warn} = logger("use{{pascalCase name}}");

function hook() {}

export function use{{pascalCase name}}() {
  return useContext({{pascalCase name}}ContextContainer.Context);
}

export const {{pascalCase name}}ContextContainer = createContainer(hook);
