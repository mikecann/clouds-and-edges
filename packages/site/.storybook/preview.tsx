import * as React from "react";
import { MyChakraProvider } from "../src/features/theme/MyChakraProvider";

export const decorators = [
  (Story, params) => {
    return (
      <MyChakraProvider>
        <Story />
      </MyChakraProvider>
    );
  },
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};
