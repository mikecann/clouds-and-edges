import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { MyChakraProvider } from "./features/theme/MyChakraProvider";
import { GLSDefaults } from "gls/lib";
import { SignupPage } from "./features/signup/SignupPage";
import { DashboardPage } from "./features/dashboard/DashboardPage";

function App() {
  const [userId, setUserId] = useState<string>();

  return (
    <MyChakraProvider>
      <GLSDefaults.Provider value={{ verticalSpacing: 0, horizontalSpacing: 0 }}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            {userId ? <DashboardPage userId={userId} /> : <SignupPage onSignup={setUserId} />}
          </header>
        </div>
      </GLSDefaults.Provider>
    </MyChakraProvider>
  );
}

export default App;
