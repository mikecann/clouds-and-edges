import * as React from "react";
import { useIsAuthenticated } from "../state/useIsAuthenticated";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

interface Props {}

export const AuthRequired: React.FC<Props> = ({ children }) => {
  const isAuthed = useIsAuthenticated();
  const history = useHistory();
  useEffect(() => {
    if (!isAuthed) {
      console.log(`user not authed, redirecting them back to signup`);
      history.push(`/signup`);
    }
  }, [isAuthed]);
  return <>{isAuthed ? children : null}</>;
};
