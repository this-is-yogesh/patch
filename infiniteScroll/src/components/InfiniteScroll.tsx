import "../styles/InfiniteScroll.css";
import { useState } from "react";

function InfiniteScroll() {
  const [list, setListItems] = useState(() => {
    return [...new Array(140)];
  });

  function loadMore() {
    setTimeout(() => {
      setListItems(prev => {
        console.log(prev, "prev", [...prev, ...new Array(100)]);
        return [...prev, ...new Array(100)];
      });
    }, 400);
  }
  return (
    <div>
      {list.map((item, index) => (
        <div>{index + 1}</div>
      ))}
      <button onClick={loadMore}>Load More</button>
    </div>
  );
}
export default InfiniteScroll;
