import * as React from "react";
import logo from "./logo.svg";
import "./Logo.css";

interface Props {}

export const Logo: React.FC<Props> = ({}) => {
  return <img src={logo} style={{ height: 140, animation: "App-logo-spin infinite 20s linear" }} />;
};
