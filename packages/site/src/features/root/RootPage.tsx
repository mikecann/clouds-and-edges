import * as React from "react";
import { useAppState } from "../state/app";
import { useHistory } from "react-router-dom";

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
