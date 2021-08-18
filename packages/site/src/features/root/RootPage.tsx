import * as React from "react";
import { useHistory } from "react-router-dom";
import { useAppState } from "../state/appState";

interface Props {}

export const RootPage: React.FC<Props> = ({}) => {
  const [state] = useAppState();
  const history = useHistory();

  React.useEffect(() => {
    if (!state.userId) history.push(`/signup`);
    else history.push(`/dashboard`);
  }, []);

  return null;
};
