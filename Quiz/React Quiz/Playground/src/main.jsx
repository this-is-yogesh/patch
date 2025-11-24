// This is a React Quiz from BFE.dev

import * as React from "react";
import { useState } from "react";
import { createRoot, flushSync } from "react-dom/client";
import { screen, fireEvent } from "@testing-library/dom";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
