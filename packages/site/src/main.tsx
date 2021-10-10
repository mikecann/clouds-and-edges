import { ColorModeScript } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { config } from "./features/config/config";

console.log(`Clouds and Edges starting..`, config);

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={"dark"} />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
