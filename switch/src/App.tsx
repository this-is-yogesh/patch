import { useState } from "react";
import "./App.css";
import Switch from "./components";

function App() {
  const [isOn, setisOn] = useState<boolean>(false);

  function handleToggle(): void {
    setisOn(!isOn);
  }
  return (
    <div className="main-layout">
      <Switch on={isOn} toggle={handleToggle} labelName={"switch "} />
    </div>
  );
}

export default App;
