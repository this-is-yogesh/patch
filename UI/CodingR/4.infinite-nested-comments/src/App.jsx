import { useState, useEffect } from "react";
import "./App.css";
import NestedComment from "./components/NestedComment";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("../src/constant/data.json")
      .then(data => data.json())
      .then(data => setData(data));
  }, []);
  return <>{data?.length && <NestedComment data={data} />}</>;
}

export default App;
