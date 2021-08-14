import { createAction } from "typesafe-actions";

export const set{{pascalCase name}} = createAction(`{{name}}/set{{pascalCase name}}`)<Record<string, any>>();
