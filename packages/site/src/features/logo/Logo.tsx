import * as React from "react";
import logo from "./cloudflare-icon.svg";
import "./Logo.css";

interface Props {}

export const Logo: React.FC<Props> = ({}) => {
  return <img src={logo} style={{ height: 140, animation: "App-logo-spin infinite 2s ease" }} />;
};
