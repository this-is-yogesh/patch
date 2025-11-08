import { useState } from "react";
import InfiniteScroll from "./components/InfiniteScroll";
import InfiniteScrollIntersection from "./components/InfiniteScrollIntersection";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app_layout">
      {/* <InfiniteScroll /> */}
      <InfiniteScrollIntersection />
    </div>
  );
}

export default App;
