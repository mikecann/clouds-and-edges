import * as React from "react";
import logo from "./cloudflare-icon.svg";
import "./Logo.css";
import { Image, ImageProps } from "@chakra-ui/react";

interface Props extends ImageProps {}

export const CloudflareLogo: React.FC<Props> = ({ ...rest }) => {
  return <Image src={logo} height={`140px`} {...rest} />;
};
