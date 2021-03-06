import * as React from "react";
//import logo from "./cloudflare-icon.svg";
import logo from "./logo.png";
import "./Logo.css";
import { Image, ImageProps } from "@chakra-ui/react";

interface Props extends ImageProps {}

export const Logo: React.FC<Props> = ({ ...rest }) => {
  return <Image src={logo} height={`140px`} {...rest} />;
};
