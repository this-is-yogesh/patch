import { useState } from "react";
import "./App.css";
import List from "./components";

function App() {
  const [listarray, setListArray] = useState<any[]>(() => {
    return new Array(1000);
  });

  return (
    <div main-attribute={"yes"} className="main_layout">
      <List listarray={listarray} />
    </div>
  );
}

export default App;
