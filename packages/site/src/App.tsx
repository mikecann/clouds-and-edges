import React from "react";
import "./index.css";
import { MyChakraProvider } from "./features/theme/MyChakraProvider";
import { GLSDefaults } from "gls/lib";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppStateProvider } from "./features/state/app";
import { Router } from "./features/router/Router";

const queryClient = new QueryClient();

function App() {
  return (
    <MyChakraProvider>
      <GLSDefaults.Provider value={{ verticalSpacing: 0, horizontalSpacing: 0 }}>
        <AppStateProvider>
          <QueryClientProvider client={queryClient}>
            <Router />
          </QueryClientProvider>
        </AppStateProvider>
      </GLSDefaults.Provider>
    </MyChakraProvider>
  );
}

export default App;
