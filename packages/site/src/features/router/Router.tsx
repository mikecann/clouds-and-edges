import * as React from "react";
import { SignupPage } from "../signup/SignupPage";
import { useAppState } from "../state/app";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { RootPage } from "../root/RootPage";
import { useColorMode } from "@chakra-ui/react";

interface Props {}

export const Router: React.FC<Props> = ({}) => {
  const [{ userId }, setState] = useAppState();
  const { setColorMode } = useColorMode();

  React.useEffect(() => {
    setColorMode("dark");
  }, []);
  
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signup">
          <SignupPage />
        </Route>
        <Route path="/">
          <RootPage />
        </Route>
        {/* <Route path="/dashboard">
            <DashboardPage />
          </Route> */}
      </Switch>
    </BrowserRouter>
  );
};
