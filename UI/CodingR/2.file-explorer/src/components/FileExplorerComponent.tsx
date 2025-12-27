import type { DataType } from "../contants/data";
import { useState } from "react";
interface FileExplorerPropsType {
  data: DataType;
}

export default function FileExplorerComponent({ data }: FileExplorerPropsType) {
  const [closedStatus, setClosedStatus] = useState(true);
  return (
    <div>
      <div>
        <span
          style={{ cursor: data.type === "folder" ? "pointer" : "" }}
          onClick={() => setClosedStatus(!closedStatus)}
        >
          {data.type === "folder" ? "🗂️ " : "📁 "}
        </span>
        <span>{data.name}</span>
      </div>
      <div style={{ paddingLeft: "20px", position: "relative" }}>
        {data?.children &&
          !closedStatus &&
          data.children.map((d, index) => (
            <div key={d.id + index}>
              <FileExplorerComponent data={d} />
            </div>
          ))}
      </div>
    </div>
  );
}
