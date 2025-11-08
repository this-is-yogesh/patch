import { useState } from "react";

const List2: React.FC<{
  listarray: any[];
  renderRow: (num: number) => number;
}> = function ({ listarray, renderRow }) {
  const [scrollTop, setScrollTop] = useState<number>(0);

  const ROW_HEIGHT = 52;
  const LIST_HEIGHT = 400;
  const OVERSCAN_COUNT = 10;
  const startIndex = Math.max(
    Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN_COUNT,
    0
  );
  const lastIndex = Math.min(
    Math.floor((LIST_HEIGHT + scrollTop) / ROW_HEIGHT) + OVERSCAN_COUNT,
    listarray?.length
  );

  const renderedRowCount = Math.min(
    listarray.length - startIndex,
    Math.floor(LIST_HEIGHT / ROW_HEIGHT) + 2 * OVERSCAN_COUNT
  );

  function handleScrolll(e: React.UIEvent) {
    let { scrollTop } = e.currentTarget;
    setScrollTop(scrollTop);
  }

  let data = Array.from({ length: listarray.length }, (_, index) => index);
  return (
    <>
      <div
        className="item_layout"
        style={{
          height: `${LIST_HEIGHT}px`,
          overflowY: "scroll",
          textAlign: "center",
          width: "50%",
          border: "1px solid red",
          margin: "0 auto",
        }}
        onScroll={handleScrolll}
      >
        <div
          style={{
            height: `${listarray.length * ROW_HEIGHT}px`, 
          }}
        >
          <div
            style={{
              transform: `translateY(${startIndex * ROW_HEIGHT}px)`,
              background: "red",
            }}
          >
            {data
              .slice(startIndex, startIndex + renderedRowCount)
              .map((d, index) => (
                <div
                  key={d}
                  style={{
                    height: `${ROW_HEIGHT}px`,
                    border: "1px solid black",
                    width: "100%",
                    backgroundColor: "gainsboro",
                  }}
                  className="item"
                >
                  {renderRow(d)}
                </div>
              ))}
          </div>
        </div>
      </div>
      {startIndex}
      {"=>"}
      {scrollTop}
      {"=>"}
      {lastIndex}
    </>
  );
};

export default List2;
