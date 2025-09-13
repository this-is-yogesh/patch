import "../styles/InfiniteScroll.css";
import { useState, useEffect, useRef } from "react";

const THRESHOLD = 20;
interface optionsType {
  threshold: number;
  rootMargin?: string;
}
export default function InfiniteScrollIntersection() {
  const arrayListRef = useRef<(HTMLDivElement | null)[]>([]);
  const [list, setListItems] = useState(() => {
    return [...new Array(140)];
  });
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    const options: optionsType = {
      threshold: 0.8,
      // rootMargin: "500px",
    };
    let observer = new IntersectionObserver(intersectionObserverCb, options);
    function intersectionObserverCb(entries: IntersectionObserverEntry[]) {
      entries.forEach(entry => {
        const target = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          loadMore();
          target.style.backgroundColor = "blue";
        } else {
          target.style.backgroundColor = "red";
        }
      });
    }
    arrayListRef.current.forEach((element, index) => {
      if (element && index === list.length - 1) observer.observe(element);
    });

    let lastElement: HTMLDivElement | null =
      arrayListRef.current[arrayListRef.current.length - 1];
    return () => {
      if (lastElement) {
        observer.unobserve(lastElement);
      }
      observer.disconnect();
    };
  }, [list.length]);
  function loadMore() {
    setLoading(true);
    setTimeout(() => {
      setListItems(prev => {
        return [...prev, ...new Array(10000)];
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

  function callBackRef(el: HTMLDivElement | null, index: number) {
    if (el) arrayListRef.current[index] = el;
  }
  return (
    <div className="list_layout">
      {list.map((_, index) => (
        <div
          className="item_layout"
          key={index}
          ref={el => callBackRef(el, index)}
        >
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
