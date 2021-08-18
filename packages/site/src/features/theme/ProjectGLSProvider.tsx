import * as React from "react";
import { GLSDefaults } from "gls/lib";

interface Props {}

export const ProjectGLSProvider: React.FC<Props> = ({ children }) => {
  return (
    <GLSDefaults.Provider value={{ verticalSpacing: 0, horizontalSpacing: 0 }}>
      {children}
    </GLSDefaults.Provider>
  );
};
