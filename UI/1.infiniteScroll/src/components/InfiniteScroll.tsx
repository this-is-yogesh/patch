import "../styles/InfiniteScroll.css";
import { useState } from "react";

const THRESHOLD = 20;
function InfiniteScroll() {
  const [list, setListItems] = useState(() => {
    return [...new Array(140)];
  });
  const [loading, setLoading] = useState<Boolean>(false);

  function loadMore() {
    setLoading(true);
    setTimeout(() => {
      setListItems(prev => {
        return [...prev, ...new Array(100)];
      });
      setLoading(false);
    }, 1000);
  }

  function handleScroll(event: React.UIEvent<HTMLDivElement>) {
    let { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    let reminginScroll: number = Math.floor(
      scrollHeight - (clientHeight + scrollTop)
    ) as number;
    console.log(reminginScroll, "scroll**");
    if (reminginScroll < THRESHOLD && !loading) loadMore();
  }

  return (
    <div className="list_layout" onScroll={handleScroll}>
      {list.map((_, index) => (
        <div className="item_layout" key={index + 1}>
          {index + 1}
        </div>
      ))}
      {loading ? (
        <div>.....Loading</div>
      ) : (
        <button onClick={loadMore}>Load More</button>
      )}
    </div>
  );
}
export default InfiniteScroll;
