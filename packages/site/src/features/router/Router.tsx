import * as React from "react";
import { SignupPage } from "../signup/SignupPage";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { RootPage } from "../root/RootPage";
import { useColorMode } from "@chakra-ui/react";
import { DashboardPage } from "../dashboard/DashboardPage";
import { AuthRequired } from "./AuthRequired";
import { MyProfilePage } from "../me/MyProfilePage";
import { AdminPage } from "../admin/AdminPage";
import { useAppStatePersistance } from "../state/useAppStatePersistance";

interface Props {}

export const Router: React.FC<Props> = ({}) => {
  const { setColorMode } = useColorMode();
  useAppStatePersistance();

  React.useEffect(() => {
    setColorMode("dark");
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signup">
          <SignupPage />
        </Route>
        <Route path="/dashboard">
          <AuthRequired>
            <DashboardPage />
          </AuthRequired>
        </Route>
        <Route path="/me">
          <AuthRequired>
            <MyProfilePage />
          </AuthRequired>
        </Route>
        <Route path="/admin">
          <AdminPage />
        </Route>
        <Route path="/">
          <RootPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};