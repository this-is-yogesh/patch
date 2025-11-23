// This is a React Quiz from BFE.dev

import * as React from "react";
import { useState } from "react";
import { createRoot, flushSync } from "react-dom/client";
import { screen, fireEvent } from "@testing-library/dom";

function App() {
  const [state, setState] = useState(0);
  const [count, setCount] = useState(0);
  const [toggle, setToggle] = useState(false);
  const increment = () => {
    flushSync(() => {
      setCount(prev => prev + 1);
    });
    setToggle(toggle => !toggle);
  };
  console.log("rendering", count, toggle);
  return (
    <div>
      <button onClick={increment}>click me</button>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
