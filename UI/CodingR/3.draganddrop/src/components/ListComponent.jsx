import { useRef } from "react";
function ListComponent({ data, setInitialData }) {
  let refTarget = useRef(null);
  function onDragStartFunction(e, desc) {
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({
        name: data[0],
        desc: desc,
      })
    );
  }

  function onDragOverFunction(e) {
    e.preventDefault();
    refTarget.current.style.background = "orange";
  }

  function onDrop(e, data) {

    const dataDropped = JSON.parse(e.dataTransfer.getData("application/json"));
    let targetKey = data[0];
    let parentKey = dataDropped.name;
    let parentDesc = dataDropped.desc;
    setInitialData(prev => ({
      ...prev,
      [parentKey]: prev[parentKey].filter(data => data !== parentDesc),
      [targetKey]: [...prev[targetKey], parentDesc],
    }));
    refTarget.current.style.background = "lightgrey";
  }

  function onDragEnter() {
    // refTarget.current.style.background = "orange";
  }

  function onDragLeave() {
    refTarget.current.style.background = "lightgrey";
  }
  return (
    <div
      ref={refTarget}
      className="child_comp"
      onDragOver={onDragOverFunction}
      onDrop={e => onDrop(e, data)}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
    >
      <h3>{data[0]}</h3>
      <div className="child_body">
        {data[1].map((desc, index) => (
          <div
            className="child_description"
            key={data[0] + index}
            draggable
            onDragStart={e => onDragStartFunction(e, desc)}
          >
            {desc}
          </div>
        ))}
      </div>
    </div>
  );
}
export default ListComponent;
