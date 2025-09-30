import { useState } from "react";
import "./App.css";
import List from "./components";

function App() {
  const [listarray, setListArray] = useState<any[]>(() => {
    return new Array(10000).fill(1);
  });

  return (
    <div main-attribute={"yes"} className="main_layout">
      <List
        listarray={listarray}
        renderRow={idx => {
          return idx;
        }}
      />
    </div>
  );
}

export default App;
