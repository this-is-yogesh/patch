import { useState } from "react";
import "../styles/componentStyles.css";
import { dataLog } from "../constants/data";
import ListComponent from "./ListComponent";

export default function ParentComponent() {
  const [initialData, setInitialData] = useState(dataLog);
  function getChildData() {
    return Object.entries(initialData).map((comp, index) => {
      return (
        <ListComponent
          data={comp}
          key={index}
          setInitialData={setInitialData}
        />
      );
    });
  }

  return <div className="parent_layout">{getChildData()}</div>;
}
