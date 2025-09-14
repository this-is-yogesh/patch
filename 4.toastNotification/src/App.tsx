import { useState } from "react";
import "./App.css";
import Toast from "./components/Toast";

function App() {
  return (
    <>
      <Toast
        position={"top-right"}
        type={"danger"}
        title="message title"
        desc="message dsc is listed below"
      />
    </>
  );
}

export default App;
