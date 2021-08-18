import * as React from "react";
import { ProjectChakraProvider } from "../src/features/theme/ProjectChakraProvider";
import { ProjectGLSProvider } from "../src/features/theme/ProjectGLSProvider";

export const decorators = [
  (Story, params) => {
    return (
      <ProjectChakraProvider>
        <ProjectGLSProvider>
          <Story />
        </ProjectGLSProvider>
      </ProjectChakraProvider>
    );
  },
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};
