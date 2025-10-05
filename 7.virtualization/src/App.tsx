import { useState } from "react";
//import List from "./components";
import List2 from "./components";
//import "./styles/styles1.css"
import "./styles/styles2.css"

function App() {
  const [listarray, setListArray] = useState<any[]>(() => {
    return new Array(100000).fill(1);
  });

  return (
    <div main-attribute={"yes"} className="main_layout">
      {/* <List
        listarray={listarray}
        renderRow={idx => {
          return idx;
        }}
      /> */}
      <List2
        listarray={listarray}
        renderRow={idx => {
          return idx;
        }}
      />
    </div>
  );
}

export default App;
