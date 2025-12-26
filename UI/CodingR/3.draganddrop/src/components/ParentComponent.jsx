import { useState } from "react";
import "../styles/componentStyles.css"
import { dataLog as initialData } from "../constants/data";
import ListComponent from "./ListComponent";

/**
 *
 * parent comp will have all the three comps , and we will fix the layout of all three here
 */
export default function ParentComponent() {
  return (
    <div className="parent_layout">
      {Object.entries(initialData).map((comp, index) => {
        return <ListComponent data={comp} key={index} />;
      })}
    </div>
  );
}
