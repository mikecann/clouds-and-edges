import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { MyChakraProvider } from "./features/theme/MyChakraProvider";
import { MyButton } from "./features/buttons/MyButton";
import { Button } from "@chakra-ui/react";
import { sendCommand } from "./features/cqrs/sendCommand";

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");

  return (
    <MyChakraProvider>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Button
            colorScheme="blue"
            onClick={() =>
              sendCommand({
                aggregate: "User",
                aggregateId: "123",
                command: "create",
                payload: {
                  name: "Mike",
                },
              })
            }
          >
            Send Command
          </Button>
        </header>
      </div>
    </MyChakraProvider>
  );
}

export default App;
