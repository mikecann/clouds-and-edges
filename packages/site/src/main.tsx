import { ColorModeScript } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { theme } from "./features/theme/MyChakraProvider";

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={"dark"} />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
