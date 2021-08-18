import React from "react";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Router } from "./features/router/Router";
import { AppStateProvider } from "./features/state/appState";
import { ProjectGLSProvider } from "./features/theme/ProjectGLSProvider";
import { ProjectChakraProvider } from "./features/theme/ProjectChakraProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <ProjectChakraProvider>
      <ProjectGLSProvider>
        <AppStateProvider>
          <QueryClientProvider client={queryClient}>
            <Router />
          </QueryClientProvider>
        </AppStateProvider>
      </ProjectGLSProvider>
    </ProjectChakraProvider>
  );
}

export default App;
