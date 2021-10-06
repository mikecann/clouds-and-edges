import React from "react";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Router } from "./features/router/Router";
import { AppStateProvider } from "./features/state/appState";
import { ProjectChakraProvider } from "./features/theme/ProjectChakraProvider";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <ProjectChakraProvider>
      <AppStateProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} position={"bottom-right"} />
          <Router />
        </QueryClientProvider>
      </AppStateProvider>
    </ProjectChakraProvider>
  );
}

export default App;
