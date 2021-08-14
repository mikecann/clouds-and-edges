import * as t from "io-ts";

export const {{pascalCase name}} = t.intersection([
  t.strict({

  }), 
  t.partial({
    
  })
]);

export interface {{pascalCase name}} extends t.TypeOf<typeof {{pascalCase name}}> {}

export const produce{{pascalCase name}} = (overrides?: Partial<{{pascalCase name}}> & {}): {{pascalCase name}} =>
{{pascalCase name}}.encode({
    ...overrides,
  });
