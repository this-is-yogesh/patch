import { useState } from "react";
import "./App.css";
import ParentComponent from "./components/ParentComponent.jsx";

function App() {
  return (
    <div style={{ width: "100vw" }}>
      <ParentComponent />
    </div>
  );
}

export default App;
