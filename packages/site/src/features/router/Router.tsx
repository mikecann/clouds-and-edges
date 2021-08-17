import * as React from "react";
import logo from "../../logo.svg";
import { SignupPage } from "../signup/SignupPage";
import { DashboardPage } from "../dashboard/DashboardPage";
import { useAppState } from "../state/app";

interface Props {}

export const Router: React.FC<Props> = ({}) => {
  const [{ userId }, setState] = useAppState();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {userId ? (
          <DashboardPage userId={userId} />
        ) : (
          <SignupPage onSignup={(userId) => setState((p) => ({ ...p, userId }))} />
        )}
      </header>
    </div>
  );
};
