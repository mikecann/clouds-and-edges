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

  const doSomething = async () => {
    const response = await fetch(`http://localhost:8777/`);
    const json = await response.text();
    console.log(json);
  };

  return (
    <MyChakraProvider>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Button
            colorScheme="blue"
            onClick={() =>
              sendCommand({
                aggregate: "user",
                command: "create",
                payload: {
                  name: "Mike",
                },
              })
            }
          >
            Create User
          </Button>
          <Button colorScheme="blue" onClick={() => doSomething()}>
            Misc
          </Button>
        </header>
      </div>
    </MyChakraProvider>
  );
}

export default App;
